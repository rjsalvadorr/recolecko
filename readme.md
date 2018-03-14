# Music Production Structure

Cooked up to standardize my music production work across multiple machines.

## DIRECTORY STRUCTURE

### Main goals of the directory structure design

1. Should allow for consistent work across different environments. My machines aren't infallible, and I'll certainly be working across many.
1. Should allow for scripting or tooling to keep track of files in a meaningful way.

### Working standard

* **Music Production**
    + **Archive** - _Old stuff that's not worth organizing_ 
    + **Collaborations**
    + **Documentation** - _Guides or manuals on DAWs, VSTs, whatever_
        - Equipment
        - Reaper
    + **Drum Beats** - _Should contain MIDI files as well as sound files_
        - Originals
        - Copies
    + **Jams** - _Freestyle brainstorms. Can be seen as a staging ground. Promising sounds can be promoted to a legit project._
    + **Projects** - _Could be sketches or "serious" projects_. Should be DAW-agnostic! Each folder can contain multiple reaper files/versions
        - 0235-quailhunt
            * readme.md
        - 0236-otherblah
            * readme.md
        - 0237-randomting
            * readme.md
    + **Randoms**
    + **Recordings** - _Sounds not associated to any project_
    + **Reference** - _Tracks for comparing mix, style, levels, tuning, whatever_
    + **Samples**
    + **Soundfonts**
    + **Tech** - _Files for complicated software magic. Could also house scripts._
    + **Templates** - _DAW project templates_
    + **VST**

## FILENAME FORMAT

Model filename:    
`0132-whateverobject-98bpm-01.wav`    
This format has four elements:

1. **Project ID** - Four digit number, easily trackable in any part of the process.
1. **Name** - Could be a working title, could be a real one. Multiple-word names should be smashed together without spaces.
1. **Tempo** - Should be on every file, for easy beatmatching.
1. **Version number**

What happens when I get to project #`9999` and I have to make a new one? Just make a new projects folder and roll over to #`0001`. In that case, we'll have these two existing harmoniously:

`Projects-01/9999-holycrapreally-112bpm-04.wav`   
`Projects-02/0001-nowaydude-79bpm-01.wav`
