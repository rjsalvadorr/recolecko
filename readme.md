# Music Production Structure

A useful file/folder standard for music production work.

## OVERVIEW & DESIGN

This project was prompted by the tragedy of losing dope beats in a maze of files and folders. At the start of the project, the goal of all this was to enable a producer to:

1. Make projects often, while avoiding getting tangled in a mess of files.
1. Keep track of all files derived from any project, and track the "lineage" of any musical file.
1. Access an interactive inventory of items, sortable by tempo, project ID, etc.

Turns out those aren't the only benefits. As I used this structure, it allowed me to take advantage of:

1. Quicker music-making through reusable components like drum MIDI files.
1. Easier file backups since all my machines and backup drives have the same structure. _(drag n' drop FTW)_
1. Easier process management through automated scripts for new jam/project folders.

To accomplish this, I've laid out two standards to organize files for an easier music workflow.

1. **One consistent directory structure**, so different machines can have the same setup.
1. **A consistent filename convention**, allowing for easy scripting and detailed reports.

With these tools in hand, we can prevent senseless tragedies from happening time and time again.

> _"This work is dedicated to all fallen music files. You are dearly missed."_

## USAGE

This section assumes:

- You know how to use `Git` and `Node.JS` at a basic level.
- You're on a Windows computer. `(Linux/Mac utilities are coming soon...)`

### Minimal Usage

For minimal use, do the following:

1. Clone this repo

That's it. You can then use this folder structure however you want, without bothering with any extra features.

### Power Usage

So you think you're a hotshot and you want to do some more software magic. Cool. Do this for setup:

1. Install `Node.JS` if you don't already have it.
1. Clone the repo.
1. Depending on your system, you'd use the scripts in `/FileManagement/UtilsWindows` or `/FileManagement/UtilsMacLinux`. They have the same tools with the same names, it's just the script type that differs.
1. Head to your utils directory and run the `_setup-update` script.

That's it for initial setup. For regular use:

1. Use the `_new-jam-folder` script to create a new jam folder. The `_new-project-folder` script does the same thing, but for projects.
1. When creating files, **try keep your filenames consistent, according to the standard (see below)**. The standard has some flexibility. For example, you can omit the tempo and version. But the ID and name should be there if you want to see an accurate file inventory.
1. To see all the music files you have, go to your utils folder and run the `_update-inventory` script. The interactive inventory will then be available in `inventory.html` in the utils.

### Other Protips

The `Beats/Parts/` folder has a collection of pre-made MIDI drum parts. These can easily be dropped into a DAW to build drum tracks. (See that folder's README for more details)

The `Jams/` directory can be used as a staging ground for `Projects/`. For example, a really good jam can be promoted to be a _'real'_ project.

## FILENAME CONVENTION

Consider this example filename: `34F40-whateverobject-98bpm-01.wav`    
This format has four elements:

1. **Project ID** - A five hex-digit number, easily trackable in any part of the process.
1. **Name** - As a working title, this should take the form of _adjective_ + _noun_ (see below).
1. **Tempo** - Should be on every file, for easy beatmatching.
1. **Version number**

Beats should have a one-word noun as a name. So a beat could be named:

`35D98-cabbage-92bpm-03.mid`

Songs that use this beat can then modify the name with an adjective like so:

`D436F-saucycabbage-95bpm-02.mp3`   
`8D78E-frigidcabbage-103bpm-01.mp3`

The _beat name_ then acts a lot like a _family name_. Using this convention, we'll have a few ways to track a piece of music and its lineage:

1. Project ID
1. Song name
1. Beat name

## DIRECTORY STRUCTURE

Each folder in this repository has a readme file, so we can see the intended purpose for each folder. Here's a good look at the folder structure and its intended usage:

```
Music Production (or whatever you name this thing)
├───Beats - Can contain MIDI files as well as sound files
│   ├───OriginalBeats
│   └───DrumParts
├───Documentation - Guides/manuals for DAWs, VSTs, real equipment
├───FileManagement - Tools for managing project files
│   ├───Scripts - Node.JS scripts that do the real work
│   ├───UtilsMacLinux - Tools for *NIX environments
│   └───UtilsWindows - Tools for Windows
├───Jams - Freestyles and brainstorms
├───Projects - Actual projects. Should be DAW-agnostic. For example:
│   ├───34F4C-quailhunt
│   ├───AD634F-sampleproject
│   └───BF284-braindump
├───Recordings - Sounds not associated to any project
├───Samples
├───Soundfonts
├───Tech - Files for music software, and utilities
├───Templates - DAW project templates
└───VST
    ├───Effects
    ├───Instruments
    └───Samplers
```

## TECHNICAL CONSIDERATIONS

The project uses Node.JS for a few reasons:

- Super easy setup
- Cross platform
- Super hip at the time of writing (Early 2018)

For the 5-digit hex timestamps, the first three digits are based on the current day, and the last two are a random value from 1 to 255. This helps ensure that a generated project ID should be unique at all times.
