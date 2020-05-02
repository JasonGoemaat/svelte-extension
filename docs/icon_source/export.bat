rem https://inkscape.org/doc/inkscape-man.html

rem --i (-export-id) hopefully will just export the named group
rem -w (--export_width=WIDTH) and -h (--export-height=HEIGHT) should be width and height (need px or something?)
rem -j (--export-id-only) should hide all objects except ones specified with -i

rem # android icon sizes
C:\apps\inkscape\bin\inkscape -i round -w 16 -h 16 -j -o icons/round_16.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 22 -h 22 -j -o icons/round_22.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 24 -h 24 -j -o icons/round_24.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 32 -h 32 -j -o icons/round_32.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 33 -h 33 -j -o icons/round_33.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 36 -h 36 -j -o icons/round_36.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 44 -h 44 -j -o icons/round_44.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 48 -h 48 -j -o icons/round_48.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 64 -h 64 -j -o icons/round_64.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 66 -h 66 -j -o icons/round_66.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 72 -h 72 -j -o icons/round_72.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 88 -h 88 -j -o icons/round_88.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 96 -h 96 -j -o icons/round_96.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 144 -h 144 -j -o icons/round_144.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 192 -h 192 -j -o icons/round_192.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i round -w 512 -h 512 -j -o icons/round_512.png inkscape.svg


C:\apps\inkscape\bin\inkscape -i square -w 22 -h 22 -j -o icons/square_22.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 29 -h 29 -j -o icons/square_29.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 44 -h 44 -j -o icons/square_44.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 50 -h 50 -j -o icons/square_50.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 58 -h 58 -j -o icons/square_58.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 60 -h 60 -j -o icons/square_60.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 66 -h 66 -j -o icons/square_66.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 75 -h 75 -j -o icons/square_75.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 76 -h 76 -j -o icons/square_76.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 80 -h 80 -j -o icons/square_80.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 87 -h 87 -j -o icons/square_87.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 120 -h 120 -j -o icons/square_120.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 152 -h 152 -j -o icons/square_152.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 167 -h 167 -j -o icons/square_167.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 180 -h 180 -j -o icons/square_180.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 1024 -h 1024 -j -o icons/square_1024.png inkscape.svg

rem # chrome extension
C:\apps\inkscape\bin\inkscape -i square -w 16 -h 16 -j -o icons/square_16.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 19 -h 19 -j -o icons/square_19.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 24 -h 24 -j -o icons/square_24.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 32 -h 32 -j -o icons/square_32.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 38 -h 38 -j -o icons/square_38.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 48 -h 58 -j -o icons/square_48.png inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 128 -h 128 -j -o icons/square_128.png inkscape.svg

rem # svg for use directly in web pages
C:\apps\inkscape\bin\inkscape -i round -w 32 -h 32 -j -l --vacuum-defs --export-plain-svg -o round_32.svg inkscape.svg
C:\apps\inkscape\bin\inkscape -i square -w 32 -h 32 -j -l -o icons/square_32.svg inkscape.svg

C:\apps\inkscape\bin\inkscape -i round -w 32 -h 32 -j -l --vacuum-defs --export-plain-svg -o round_32.svg round.svg