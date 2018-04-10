# recolecko

A file manager for creatives that work fast.

## OVERVIEW & DESIGN

This project was prompted by the tragedy of losing dope beats in a maze of music files and folders. At the start of the project, the goal of all this was to enable a producer to:

1. Make projects often, while avoiding getting tangled in a mess of files.
1. Keep track of all files derived from any project, and track the "lineage" of any musical file.
1. Access an interactive inventory of items, sortable by tempo, project ID, etc.
1. Process management through automated scripts for new draft/project folders.

To accomplish this, I've written software that uses **a consistent filename convention** to allowing for scripting and detailed reports.

Initially, this was made for a music production workflow, but I feel that my problems were generic enough to apply to other creative styles. Writers can pump out tons of drafts. Artists can have tons of process and reference images. So I redesigned this to apply for creative people that move fast and make lots of files, but don't want to work among their digital filth.

With these tools in hand, we can prevent senseless tragedies from happening time and time again.

> _"This work is dedicated to all lost music files. You are dearly missed."_

## USAGE

`// WORK IN PROGRESS`

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

## TECHNICAL CONSIDERATIONS

The project uses Node.JS for a few reasons:

- Super easy setup
- Cross platform
- Super hip at the time of writing (Early 2018)

For the 5-digit hex timestamps, the first three digits are based on the current day, and the last two are a random value from 1 to 255. This helps ensure that a generated project ID should be unique at all times.
