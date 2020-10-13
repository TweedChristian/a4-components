(this.webpackJsonpnote=this.webpackJsonpnote||[]).push([[0],{34:function(e,t,a){e.exports={uploadButton:"upload_uploadButton__34xsR",formButtons:"upload_formButtons__2d8Gr"}},52:function(e,t,a){e.exports=a(92)},86:function(e,t,a){},92:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(50),o=a.n(r),c=a(17),i=a(1),s=a(3),m=a(4),u=a(6),h=a(5),d=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).login=function(){fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({username:"test",password:"abcd"})}).then((function(e){return console.log(e)}))},e.mongoTest=function(){fetch("/mongoTest",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){return console.log(e)}))},e}return Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h1",null,"Test"),l.a.createElement("button",{className:"btn",onClick:this.login},"Login Test"),l.a.createElement("button",{className:"btn",onClick:this.mongoTest},"Mongo Test"))}}]),a}(n.Component),p=a(13),E=a(11),g=a(34),f=a.n(g),b=a(21),F=a.n(b),D=a(19),C=a.n(D),v=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).state={musicFile:null,songName:null},e.handleChange=function(t){e.setState(Object(E.a)(Object(E.a)({},e.state),{},Object(p.a)({},t.target.id,t.target.value)))},e.handleFileChange=function(t){e.setState(Object(E.a)(Object(E.a)({},e.state),{},{musicFile:t.target.files[0]}))},e.handleSubmit=function(t){t.preventDefault();var a=e.state,n=new FormData;n.append("songName",a.songName),n.append("xmlFile",a.musicFile),fetch("/uploadXML",{credentials:"include",method:"POST",body:n}).then((function(e){return 403===e.status?F.a.toast({html:"You are not logged in"}):400===e.status?F.a.toast({html:"Your file could not be read"}):500===e.status?F.a.toast({html:"Server Error"}):F.a.toast({html:"File Uploaded"}),e})).then((function(e){return e.json()})).then((function(e){if(e.abcString){window.AudioContext=window.AudioContext||window.webkitAudioContext||navigator.mozAudioContext||navigator.msAudioContext;var t=new window.AudioContext,a=C.a.renderAbc("musicPlayer",e.abcString),n=new C.a.synth.CreateSynth;n.init({audioContext:t,visualObj:a[0],millisecondsPerMeasure:2115,options:{program:33,midiTranspose:-12}}).then((function(e){n.prime().then((function(e){n.start()}))})).then((function(){return Promise.resolve()})).catch((function(e){console.log(e)}))}}))},e}return Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement("article",{className:"card blue-grey darken-2"},l.a.createElement("header",{className:"card-header"},l.a.createElement("h3",{className:"card-title white-text header"},"Upload a Song")),l.a.createElement("div",{className:"card-content"},l.a.createElement("p",{className:"flow-text white-text"},"The file required is a musicXML file. No other file types are supported at the moment."),l.a.createElement("p",{className:"flow-text white-text"},"However, most tab and sheet music programs include a musicXML converter."),l.a.createElement("form",{className:"container form",encType:"multipart/form-data",onSubmit:this.handleSubmit,action:"submit"},l.a.createElement("label",{htmlFor:"songName",className:"songName white-text"},"Song Name"),l.a.createElement("input",{type:"text",id:"songName",className:"text-input white-text",onChange:this.handleChange}),l.a.createElement("div",{className:f.a.formButtons},l.a.createElement("label",{htmlFor:"fileUpload",className:f.a.uploadButton},l.a.createElement("p",{className:"waves-effect waves-light btn-large orange darken-4 white-text"},"MusicXML File",l.a.createElement("i",{className:"material-icons right"},"arrow_upward")),l.a.createElement("br",null)),l.a.createElement("input",{className:"fileUpload",id:"fileUpload",name:"fileUpload",type:"file",accept:".xml",onChange:this.handleFileChange}),l.a.createElement("button",{className:"btn waves-effect waves-light teal accent-3 black-text",type:"submit",name:"action",id:"uploadXML"},"Submit",l.a.createElement("i",{className:"material-icons right"},"send")))),l.a.createElement("div",{style:{"overflow-x":"scroll"}},l.a.createElement("div",{id:"musicPlayer",className:"center-align"}))))}}]),a}(n.Component),w=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).jotaro='X:1\nT:Stardust Crusaders\nL:1/16\nQ:1/4=140\nM:4/4\nI:linebreak $\nK:C\nV:1 bass stafflines=4 strings=E2,A2,D3,G3 nm="Bass Guitar"\nV:1\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %2\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %4\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %6\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %8\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %10\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %12\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %14\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %16\n F,2 C,2 ^D, E, z F, F,2 C,2 D,2 E,2 | F,2 C,2 ^D, E, z F, F,2 D,2 F,2 ^F,2 | %18\n F,2 C,2 ^D, E, z F, F,2 C,2 D,2 E,2 | F,2 C,2 ^D, E, z F, F, z z2 z4 | %20\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %22\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %24\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %26\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %28\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %30\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %32\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %34\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %36\n F,2 C,2 ^D, E, z F, F,2 C,2 D,2 E,2 | F,2 C,2 ^D, E, z F, F,2 D,2 F,2 ^F,2 | %38\n F,2 C,2 ^D, E, z F, F,2 C,2 D,2 E,2 | F,2 C,2 ^D, E, z F,4 F,4 F, | %40',e.test=function(){window.AudioContext=window.AudioContext||window.webkitAudioContext||navigator.mozAudioContext||navigator.msAudioContext;var t=new window.AudioContext,a=C.a.renderAbc("musicPlayer",e.jotaro),n=new C.a.synth.CreateSynth;n.init({audioContext:t,visualObj:a[0],millisecondsPerMeasure:2115,options:{program:33,midiTranspose:-12}}).then((function(e){n.prime().then((function(e){n.start()}))})).then((function(){return Promise.resolve()})).catch((function(e){console.log(e)}))},e}return Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement("article",{className:"card blue-grey darken-2"},l.a.createElement("header",{className:"card-header"},l.a.createElement("h3",{className:"card-title white-text header"},"Upload a Song")),l.a.createElement("div",{className:"card-content"},l.a.createElement("p",{className:"flow-text white-text"},"Here is a song demo"),l.a.createElement("p",{className:"flow-text white-text"},"It is not the best, but that's because the Midi player for ABCJS isn't super clean. Currently the tempo is dropped a little."),l.a.createElement("div",{style:{"overflow-x":"scroll"}},l.a.createElement("div",{id:"musicPlayer",className:"center-align"})),l.a.createElement("button",{className:"btn waves-effect waves-light teal accent-3 black-text",onClick:this.test},"Play")))}}]),a}(n.Component),z=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={songs:[]},e.getSongs=function(){fetch("/songs",{credentials:"include",method:"GET"}).then((function(e){return e.json()})).then((function(e){return e.songs?e.songs:[]})).then((function(t){var a=[];t.map((function(e){return a.push(l.a.createElement("li",{className:"flow-text white-text"},e.songName))})),e.setState((function(e){return{songs:a}})),console.log(e.state)}))},e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){this.getSongs()}},{key:"render",value:function(){return l.a.createElement("article",{className:"card blue-grey darken-2"},l.a.createElement("header",{className:"card-header"},l.a.createElement("h3",{className:"card-title white-text header"},"Upload a Song")),l.a.createElement("div",{className:"card-content"},l.a.createElement("p",{className:"flow-text white-text"},"These are your songs"),l.a.createElement("ul",null,this.state.songs)))}}]),a}(n.Component),B=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).login=function(){fetch("/authStatus",{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){return console.log(e)}))},e}return Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement("main",{className:"container mainFooterSticky"},l.a.createElement("header",null,l.a.createElement("h2",{className:"pageHeader"},"Home")),l.a.createElement("button",{className:"btn",onClick:this.login},"Auth?"),l.a.createElement(v,null),l.a.createElement(w,null),l.a.createElement(z,null))}}]),a}(n.Component),y=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).state={username:null,password:null},e.handleChange=function(t){e.setState(Object(E.a)(Object(E.a)({},e.state),{},Object(p.a)({},t.target.id,t.target.value)))},e.handleSubmit=function(t){t.preventDefault();var a=e.state;fetch("/login",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){return console.log(e)}))},e}return Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement("main",{className:"container mainFooterSticky"},l.a.createElement("header",null,l.a.createElement("h1",{className:"pageHeader"},"Login")),l.a.createElement("form",{onSubmit:this.handleSubmit,action:"submit"},l.a.createElement("p",null,"Please fill out the form below to login to your account."),l.a.createElement("label",{htmlFor:"username"},"Username"),l.a.createElement("input",{id:"username",type:"text",onChange:this.handleChange}),l.a.createElement("label",{htmlFor:"password"},"Password"),l.a.createElement("input",{id:"password",type:"password",onChange:this.handleChange}),l.a.createElement("div",{className:"right-align"},l.a.createElement("button",{className:"btn waves-effect waves-light teal accent-3 black-text formButton",type:"submit",name:"action",id:"login"},"Submit",l.a.createElement("i",{className:"material-icons right"},"send")))),l.a.createElement("p",null,"Don't Have An Account?",l.a.createElement("a",{href:"/register"},"Register")))}}]),a}(n.Component),N=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).state={username:null,password:null,email:null,name:null},e.handleChange=function(t){e.setState(Object(E.a)(Object(E.a)({},e.state),{},Object(p.a)({},t.target.id,t.target.value)))},e.handleSubmit=function(t){t.preventDefault();var a=e.state;fetch("/register",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){return console.log(e)}))},e}return Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement("main",{className:"container mainFooterSticky"},l.a.createElement("header",null,l.a.createElement("h1",{className:"pageHeader"},"Register")),l.a.createElement("form",{onSubmit:this.handleSubmit,action:"submit"},l.a.createElement("p",null,"Please fill out the form below to login to your account."),l.a.createElement("label",{htmlFor:"name"},"First Name"),l.a.createElement("input",{id:"name",type:"text",onChange:this.handleChange}),l.a.createElement("label",{htmlFor:"email"},"Email"),l.a.createElement("input",{id:"email",type:"email",onChange:this.handleChange}),l.a.createElement("label",{htmlFor:"username"},"Username"),l.a.createElement("input",{id:"username",type:"text",onChange:this.handleChange}),l.a.createElement("label",{htmlFor:"password"},"Password"),l.a.createElement("input",{id:"password",type:"password",onChange:this.handleChange}),l.a.createElement("div",{className:"right-align"},l.a.createElement("button",{className:"btn waves-effect waves-light teal accent-3 black-text formButton",type:"submit",name:"action",id:"login"},"Submit",l.a.createElement("i",{className:"material-icons right"},"send")))),l.a.createElement("p",null,"Have an account? ",l.a.createElement("a",{href:"/login"},"Login")))}}]),a}(n.Component),j=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h1",null,"Single Song Display"))}}]),a}(n.Component);a(86);var A=function(){return l.a.createElement(c.a,null,l.a.createElement("div",null,l.a.createElement("nav",null,l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(c.b,{to:"/test"},"Test")),l.a.createElement("li",null,l.a.createElement(c.b,{to:"/home"},"Home")),l.a.createElement("li",null,l.a.createElement(c.b,{to:"/login"},"Login")),l.a.createElement("li",null,l.a.createElement(c.b,{to:"/register"},"Register")),l.a.createElement("li",null,l.a.createElement(c.b,{to:"/songs"},"My Songs"))))),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/test"},l.a.createElement(d,null)),l.a.createElement(i.a,{path:"/home"},l.a.createElement(B,null)),l.a.createElement(i.a,{path:"/login"},l.a.createElement(y,null)),l.a.createElement(i.a,{path:"/register"},l.a.createElement(N,null)),l.a.createElement(i.a,{path:"/songs"},l.a.createElement(z,null)),l.a.createElement(i.a,{path:"/song/:id",component:j})))};a(91);o.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(A,null)),document.getElementById("root"))}},[[52,1,2]]]);
//# sourceMappingURL=main.8b42acf5.chunk.js.map