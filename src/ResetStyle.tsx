import { createGlobalStyle } from 'styled-components';

const ResetStyle = createGlobalStyle`
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video,
button,
input[type='checkbox'],
input[type='radio'] {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  color: #242424;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  text-decoration: none;
  outline: none;
}
a:hover,
a:active {
  text-decoration: none;
}

input { 
-webkit-appearance : none;
-moz-appearance:none;
appearance:none;
border: none;
}

input::-ms-clear { display:none;}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-out-spin-button {
-webkit-appearance: none;
-moz-appearance:none;
appearance:none;
}

select {
-webkit-appearance: none;
-moz-appearance:none;
appearance:none;
}

select::-ms-expand { display:none; }
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
-webkit-appearance: none;
-mox-appearance: none;
appearance: none;
}

input[type=number] {
-moz-appearance:textfield; 
}

input:focus,
textarea {
  outline: none;
}

textarea {
  resize: none;
  border: none;
}

* {
    box-sizing: border-box;
}
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
body {
  line-height: 1;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
}

input, textarea {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
}

button {
  cursor: pointer;
}
`;

export default ResetStyle;
