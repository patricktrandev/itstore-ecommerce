import styled from "styled-components";
export const StyledTag = styled.div`
background: ${props => props.bg === 'red' ? 'linear-gradient(to bottom right, #F72878, #F71BC1)' : 'linear-gradient(to bottom right, #94EFD6, #08AD22)'};
border-radius: 3px 0 0 3px;
color: #999;
display: inline-block;
height: 26px;
line-height: 26px;
padding: 0 20px 0 23px;
position: relative;
margin: 0 10px 10px 0;
text-decoration: none;
-webkit-transition: color 0.2s;
&::before {
    background: #fff;
    border-radius: 10px;
    box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
    content: '';
    height: 6px;
    left: 10px;
    position: absolute;
    width: 6px;
    top: 10px;
  }
  &::after {
    background: ${props => props.bg === 'red' ? 'linear-gradient(to bottom right, #EFC98B, #FC5D0D)' : 'linear-gradient(to bottom right, #94EFD6, #08AD22)'};
    border-bottom: 13px solid transparent;
    border-right: 10px solid #fff;
    border-top: 13px solid transparent;
    content: '';
    position: absolute;
    right: 0;
    top: 0;
  }
  &:hover {
    background: crimson;
    color: white;
  }
  &:hover::after {
    border-left-color: crimson; 
    background: crimson;
 }
`