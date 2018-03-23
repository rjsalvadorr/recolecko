# Music Production Structure

A directory standard for music production work.

## DESIGN, OVERVIEW, AND USAGE

This project was prompted by the tragedy of losing dope beats in a maze of files and folders. The goal of all this is to enable a producer to:

1. Make projects often, while avoiding getting tangled in a mess of files.
1. Keep track of all files derived from any project, and track the "lineage" of any musical file.
1. Use an interactive inventory of items, sortable by tempo, project ID, etc.
1. Become more productive, through reusable components like drum MIDI files.

To accomplish this, I've laid out two ways to organize files for an eas music workflow.

1. By having **one consistent directory setup** across different machines, it should be easier to organize and work on music.
1. **A consistent filename convention** should make it easier to organize and keep track of files. This should also allow for scripting and detailed reports.

With these tools in hand, we can prevent useless tragedies from happening.

_"RIP to all the lost beats. You are dearly missed."_

### Usage, How-To

The `Beats/Parts/` folder has a collection of pre-made MIDI drum parts. These can easily be dropped into a DAW to build drum tracks. (See that folder's README for more details)

The `Jams/` directory can be used as a staging ground for `Projects/`. For example, a really good jam can be promoted to be a _'real'_ project.

The `Tech/` folder has executable scripts to show info on all the musical works within this framework.

## FILENAME FORMAT

Model filename:    
`0132-whateverobject-98bpm-01.wav`    
This format has four elements:

1. **Project ID** - Four digit number, easily trackable in any part of the process.
1. **Name** - As a working title, this should take the form of _adjective_ + _noun_ (see below).
1. **Tempo** - Should be on every file, for easy beatmatching.
1. **Version number**

Beats should have a one-word noun as a name. So a beat could be named:

`0342-cabbage-92bpm-03.mid`

Songs that use this beat can then modify the name with an adjective like so:

`0343-saucycabbage-95bpm-02.mp3`
`0429-frigidcabbage-103bpm-01.mp3`

The _beat name_ then acts a lot like a _family name_. Using this convention, we'll have a few ways to track a piece of music and its lineage:

1. Project ID
1. Song name
1. Beat name

## DIRECTORY STRUCTURE

### Main goals of the directory structure design

1. Should allow for consistent work across different environments. My machines aren't infallible, and I'll certainly be working across many.
1. Should allow for scripting or tooling to keep track of files in a meaningful way.

### Current Standard

```
Music Production
├───Archive - Old stuff that's not worth organizing
├───Beats - Should contain MIDI files as well as sound files
│   ├───OriginalBeats
│   └───DrumParts
├───Collaborations
├───Documentation - Guides/manuals for DAWs, VSTs, real equipment
├───Jams - Freestyles and brainstorms
├───Projects - Actual projects. Should be DAW-agnostic. For example:
│   ├───0235-quailhunt
│   ├───0236-sampleproject
│   ├───0235-braindump
├───Randoms
├───Recordings - Sounds not associated to any project
├───Reference - Technical tracks for comparing mix, style, levels, tuning
├───Samples
├───Soundfonts
├───Tech - Files for complicated software magic
│   └───Scripts
├───Templates - DAW project templates
└───VST
    ├───Effects
    └───Instruments
```

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

## Misc / Random

What happens when we get to project #`9999` and we have to make a new one? Increase the digit size and roll it over to #`00001`. So, from a four-digit number to an five-digit number. This shouldn't be a problem though. Say we made a project every day, starting from March 18, 2018. we'll get to project #`9999` on August 2, 2045.
