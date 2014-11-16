% adapted from harmaSyllableSeg
% http://uk.mathworks.com/matlabcentral/fileexchange/29261-harma-syllable-segmentation/content//harmaSyllableSeg/harmaSyllableSeg.m

function [syllables, FS, S, F, T, P] = syllablesplit (signal, Fs, WINDOW, NOVERLAP, NFFT, MINDB)

pkg load signal;

[S,F,T] = specgram(signal, NFFT, Fs, WINDOW, NOVERLAP);
mag = abs(S);

N = 1;
syllables = [];
cutoff = [];

while(1)
[freqMax, freqIndex] = max(mag,[], 1);
[argmax, segmentIndex] = max(freqMax, [], 2);
times = [];
times(1) = 0;
times(1) = T(segmentIndex);
segments = [];
segments(1) = segmentIndex;
freqs = [];
freqs(1) = F(freqIndex(segmentIndex));
amps = [];
amps(1) = 20*log10(argmax);
if (isempty(cutoff))
  cutoff = amps(1) - MINDB;
endif

if (amps(1) < cutoff)
  break;
endif


minAmp = amps(1) - MINDB;
i = 1;
t = segmentIndex;

while ((t > 1) && (amps(i) >= minAmp))
  t = t-1;
  i = i+1;
  segments(i) = t;
  times(i) = T(t);
  freqs(i) = F(freqIndex(t));
  amps(i) = 20*log10(freqMax(t));
endwhile

if (i > 1)
  segments(i) = []
  times(i) = []
  freqs(i) = [];
  amps(i) = [];
  i = i-1;
endif

t = segmentIndex;
while ((t < length(freqIndex)) && (amps(i) >= minAmp))
t = t+1;
i = i+1;
segments(i) = t;
times(i) = T(t);
freqs(i) = F(freqIndex(t));
amps(i) = 20*log10(freqMax(t));
endwhile

if (i > 1)
segments(i) = [];
times(i) = [];
freqs(i) = [];
amps(i) = [];
i = i-1;
endif

syllables(N).signal = signal(round(min(times)*Fs):round(max(times)*Fs),1);
syllables(N).segments = segments;
syllables(N).times = times;
syllables(N).freqs = freqs;
syllables(N).amps = amps;

N = N+1;

mag(:,segments) = 0;

endwhile

endfunction
