## 3.4.3 (2026-07-24)

### Fixes

- **editor**: settings dialog cut some controls
- **periodic-table**: periodic-table scaled twice after opening it in editor and as standalone
- **renderer**: Speed up structure rendering
- **renderer**: Fix V3000 with acd extensions rendering bug
- **renderer**: Fix IKCRenderer update method return value
- **editor**: Memory leaks when open Ketcher
- **editor**: Make structure renderer load Indigo library on-demand to parse V3000 files with advanced features
-**renderer**: Make structure renderer load Indigo library on-demand to parse V3000 files with advanced features
- **editor**: Use indigo service while importing structure in setMolFile of editor-web-config component
- **editor**: Added parameter 'format' to getMolFile to get molecule in specified format. If omitted, we use autodetect and return, for example, in V3000 format if stereochemistry was detected
- **editor**: Multiple instances of JS VM after open Ketcher
- **renderer**: Added showMarkushShadows to IKCRenderer interface
- **renderer**: Errors from ketcher in console during painting molecule
- **renderer**: Add highlight to markush attachement points
- **renderer**: Support import of markush shadows in ketcher component
- **renderer**:Red circle coloration on atom is absent in assignment mode in some cases
- **renderer**: Many ''Error: <path> attribute d: Expected number' in console appear if switch off displaying Atom numbers and switch on NMR Shifts labels on structure for specific example
- **editor**: clear atoms aam field after V3000 deserializing (incorrect atom label rendering)
- **renderer**: highlight sphere center atom even if sphere radius equal to zero
- **renderer**: highlight center atom for sphere using the same style as pointed atom
