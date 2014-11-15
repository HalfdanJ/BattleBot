#!/usr/bin/octave

file_name = argv(){1};

[signal,Fs] = wavread(file_name);

WINDOW = 100;
NOVERLAP = 50;
NFFT = 30;

[syllables, FS, S, F, T, P] = syllablesplit(signal, Fs, WINDOW, NOVERLAP, NFFT, 20);

clean_name = strrep(file_name, ".wav", "")

for i=1:length(syllables)
syllable_file_name = strcat(clean_name,mat2str(i),".wav");
wavwrite(syllables(i).signal, Fs, syllable_file_name);
endfor

