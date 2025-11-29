/**
 * @packageDocumentation
 * @module index
 *
 * 🎃 Gleam javascript library
 *
 * This file is uses to build github workflow
 */

// CORE
import jscore from "./gbr/js/jscore.gleam"
import jsglobal from "./gbr/js/jsglobal.gleam"

// DOM
import jsdocument from "./gbr/js/jsdocument.gleam"
import jselement from "./gbr/js/jselement.gleam"
import jsevent from "./gbr/js/jsevent.gleam"

// UTIL
import jsdate from "./gbr/js/jsdate.gleam"
import jsfile from "./gbr/js/jsfile.gleam"
import jsfile_system from "./gbr/js/jsfile_system.gleam"
import jsgeolocation from "./gbr/js/jsgeolocation.gleam"

// MODULE
import darkmode from "./gbr/js/darkmode.gleam"

export const jscore = jscore
export const jsglobal = jsglobal

export const jsdocument = jsdocument
export const jselement = jselement
export const jsevent = jsevent

export const jsdate = jsdate
export const jsfile = jsfile
export const jsfile_system = jsfile_system
export const jsgeolocation = jsgeolocation

export const darkmode = darkmode
