# Music Production Structure

A directory standard for music production work.

## DESIGN, OVERVIEW, AND USAGE

This project was basically prompted by a tragedy of losing some dope beats in a giant maze of files and folders. The goal of all this is to enable a producer to:

1. Make projects often (Think agile!), without forgetting or being overwhelmed by organization.
1. Keep track of all files derived from any project, and track the "lineage" of any musical file.
1. Use an interactive inventory of items, sortable by tempo, project ID, etc.

By having one consistent directory setup across different machines, it should be easier to organize and work on music.

A consistent filename convention should make it easier to organize and keep track of files. Should also allow for scripting and detailed reports.

### Usage

Use the _Jams_ directory as a staging ground for _Projects_. Make a habit of listening through it!

## DIRECTORY STRUCTURE

### Main goals of the directory structure design

1. Should allow for consistent work across different environments. My machines aren't infallible, and I'll certainly be working across many.
1. Should allow for scripting or tooling to keep track of files in a meaningful way.

### Working standard

* **Music Production**
    + **Archive** - _Old stuff that's not worth organizing_ 
    + **Beats** - _Should contain MIDI files as well as sound files_
        - Originals
        - Studies
        - Parts
    + **Collaborations**
    + **Documentation** - _Guides or manuals on DAWs, VSTs, physical equipment, whatever_
        - Equipment
        - Reaper
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

What happens when we get to project #`9999` and we have to make a new one? Increase the digit size and roll it over to #`00001`. So, from a four-digit number to an five-digit number. In that case, we'll have these two existing harmoniously:

`Projects/9999-holycrapreally-112bpm-04.wav`   
`Projects/00001-nowaydude-79bpm-01.wav`

This shouldn't be a problem though. Say I made a project every day, starting from March 18, 2018. I'll get to project #`9999` on August 2, 2045.

## TECHNICAL CONSIDERATIONS

### Item Reports

A standard filename format allows for scripting and reporting. The main goal of all this: to ensure that I never lose a file again. Every item will have two identifiers (project ID and name), and therefore, two different ways to see what's related to it.

For a basic thing, I see it like so:

1. Scripts to read various filenames in the folders.
    + Probably in Python
    + Called through batch file and shell script
1. Outputs a series of text files:
    + files sorted by tempo
    + files sorted by name
    + files sorted by format
    + CSV file with all that info. Fields in the report:
        * id
        * name
        * tempo
        * version
        * path relative to root

### Other Scripts

1. Create jam folder using current date.
1. Create next project folder.
