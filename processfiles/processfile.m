#!/usr/bin/octave

file_name = argv(){1};

[signal,Fs] = wavread(file_name);

WINDOW = 64;
NOVERLAP = 0;
NFFT = 64;
DBIN = 20;

%signal = fastsmooth(signal, 40, 3, 1);

[syllables, FS, S, F, T, P] = syllablesplit(signal*20, Fs, WINDOW, NOVERLAP, NFFT, DBIN);

clean_name = strrep(file_name, ".wav", "");

for i=1:length(syllables);
syllable_file_name = strcat(clean_name,"_",mat2str(i),".wav");
wavwrite(syllables(i).signal, Fs, syllable_file_name);
endfor;

