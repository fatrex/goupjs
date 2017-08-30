# GoUp JS

#### Info
A simple JavaScript plugin that let users go back to the top of a web page.

This is a rewrite, using only vanilla JS, of the jQuery GoUp! plugin published here:  
https://github.com/dnlnrs/jquery-goup

### Options

| Name            	| Description                                                                                    | Type    | Default        |
|-------------------|------------------------------------------------------------------------------------------------|---------|----------------|
| `location`        | On which side the button will be shown ("left" or "right")                                     | String  | right          |
| `locationOffset`  | How many pixel the button is distant from the edge of the screen, based on the location setted | Integer | 20             |
| `bottomOffset`    | How many pixel the button is distant from the bottom edge of the screen                        | Integer | 10             |
| `containerSize` 	| The width and height of the button (minimum is 20)                                     		 | Integer | 40             |
| `containerRadius` | Round container corners.                                                                       | Integer | 10             |
| `containerClass`  | The class name given to the button container                                                   | String  | goup-container |
| `arrowClass`      | The class name given to the arrow container                                                    | String  | goup-arrow     |
| `containerColor`  | The color of the container (in hex format)                                                   	 | String  | #000 			|
| `arrowColor`      | The color of the arrow (in hex format)	                                                     | String  | #fff           |
| `trigger`         | After how many scrolled down pixels the button must be shown (bypassed by `alwaysVisible`)     | Integer | 500            |
| `alwaysVisible`   | Set to true if u want the button to be always visible (bypass `trigger`)                       | Boolean | false          |
| `hideUnderWidth`  | The threshold of window width under which the button is permanently hidden                     | Integer | 500            |
| `zIndex`          | Set the z-index                                                                                | Integer | 1              |

### License and Copyright
GoUp JS is licensed under the [GPL](http://www.gnu.org/licenses/gpl.html) license.

&copy; 2016-2017 Daniele Lenares