/**
 * @packageDocumentation
 * @module index
 *
 * 🎃 Gleam javascript library
 *
 * This file is uses to build github workflow
 */

// CORE
import * as jscore from "./gbr/js/jscore.gleam"
import * as jsglobal from "./gbr/js/jsglobal.gleam"

// DOM
import * as jsdocument from "./gbr/js/jsdocument.gleam"
import * as jselement from "./gbr/js/jselement.gleam"
import * as jsevent from "./gbr/js/jsevent.gleam"

// UTIL
import * as jsdate from "./gbr/js/jsdate.gleam"
import * as jsfile from "./gbr/js/jsfile.gleam"
import * as jsfile_system from "./gbr/js/jsfile_system.gleam"
import * as jsgeolocation from "./gbr/js/jsgeolocation.gleam"

// MODULE
import * as darkmode from "./gbr/js/darkmode.gleam"

export const Core = jscore
export const Global = jsglobal

export const Document = jsdocument
export const Element = jselement
export const Event = jsevent

export const Date = jsdate
export const File = jsfile
export const File_system = jsfile_system
export const Geolocation = jsgeolocation

export const Darkmode = darkmode
