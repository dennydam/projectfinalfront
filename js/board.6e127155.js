"use strict";(self["webpackChunkfront"]=self["webpackChunkfront"]||[]).push([[198],{1572:function(t,e,s){s.r(e),s.d(e,{default:function(){return V}});var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-dialog",{attrs:{id:"modal-product",persistent:"","max-width":"1000"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,i=e.attrs;return[s("v-btn",t._g(t._b({staticClass:"additem",attrs:{color:"primary",dark:"",width:"250px"}},"v-btn",i,!1),a),[t._v(" 我要發問 ")])]}}]),model:{value:t.dialog1,callback:function(e){t.dialog1=e},expression:"dialog1"}},[s("div",{staticClass:"container01"},[s("v-card",[s("v-container",[s("v-form",{ref:"form"},[s("v-text-field",{attrs:{type:"text",required:"",placeholder:"請輸入討論主題",state:t.state.name,outlined:""},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),s("v-form",{ref:"form"},[s("v-textarea",{staticClass:"mt-10",attrs:{state:t.state.description,required:"",rows:"3","max-rows":"6",placeholder:"請描述問題",color:"teal"},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}})],1),s("v-card-actions",[s("v-spacer"),s("v-btn",{attrs:{color:"green darken-1",text:"",disabled:t.modalSubmitting},on:{click:t.submitModal}},[t._v(" 送出 ")]),s("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.dialog1=!1}}},[t._v(" 取消 ")])],1)],1)],1)],1)]),s("v-container",{attrs:{"mt-16":""}},[s("v-row",t._l(t.products2,(function(e){return s("v-col",{key:e._id,attrs:{align:"center",justify:"center",cols:"12",lg:"4",sm:"6"}},[s("v-card",{staticClass:"discuss",attrs:{elevation:"12",outlined:"",shaped:"","max-width":"344"}},[s("h1",[t._v("主題:"+t._s(e.name))]),s("v-card-text"),s("v-card-text",[t._v(t._s(e.description)+" ")]),s("v-divider",{staticClass:"mx-4"}),s("v-card-actions",[s("v-icon",[t._v("mdi-account")]),s("p",{staticClass:"mt-4"},[t._v(t._s(t.user.account))]),s("v-spacer"),s("v-btn",{on:{click:function(s){return t.discussopen(e)}}},[t._v("cc ")])],1)],1)],1)})),1),s("v-dialog",{attrs:{"max-width":"900"},model:{value:t.discuss,callback:function(e){t.discuss=e},expression:"discuss"}},[s("v-card",{attrs:{"mt-10":""}},[s("v-container",[s("v-toolbar",{attrs:{color:"primary",dark:""}},[s("h1",[t._v("主題:"+t._s(t.form.name))])]),s("v-card-text",[s("v-card-text",[t._v("描述: "+t._s(t.form.description))]),s("v-divider",{staticClass:"mx-4 my-4"}),t._l(t.form.messages,(function(e){return s("v-card-text",{key:e._D,attrs:{"d-flex":""}},[s("v-row",{staticClass:"d-flex"},[s("v-icon",[t._v("mdi-account")]),s("p",{staticClass:"my-5"},[t._v(t._s(e.account)+":"+t._s(e.text))]),s("v-spacer"),s("p",{staticClass:"my-5"},[t._v(t._s(e.date))])],1),s("v-divider",{staticClass:"mx-4 my-4"})],1)}))],2),s("v-text-field",{attrs:{outlined:"","append-outer-icon":"mdi-send"},on:{"click:append-outer":function(e){return t.sendmessage()}},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}})],1)],1)],1)],1)],1)},i=[],r={data(){return{number:-1,sending:!1,text:"",modalSubmitting:!1,products2:[],form:{user:"",name:"",description:"",_id:"",message:""},discuss:!1,dialog:!1,dialog1:!1,dialogDelete:!1,editedIndex:-1}},computed:{state(){return{name:0!==this.form.name.length||null}}},created1(){this.initialize()},methods:{async submitModal(){if(!this.state.name)return;this.modalSubmitting=!0;const t=new FormData;for(const s in this.form)"_id"!==s&&t.append(s,this.form[s]);try{if(0===this.form._id.length){const{data:e}=await this.api.post("/board",t,{headers:{authorization:"Bearer "+this.user.token}});console.log(e.result),this.products2.push(e.result),this.dialog1=!1}this.modalSubmitting=!1,this.form={name:"",description:"",_id:""}}catch(e){this.$swal({icon:"error",title:"錯誤",text:e.response.data.message})}},async discussopen(t){this.discuss=!0,this.form.name=t.name,this.form.user=this.form._id=t._id,this.form.description=t.description,this.form.messages=t.messages,this.number=this.products2.indexOf(t)},async sendmessage(){try{const{data:t}=await this.api.post("/board/"+this.form._id,{text:this.text,account:this.user.account},{headers:{authorization:"Bearer "+this.user.token}});this.products2[this.number].messages.push(t.result.messages[t.result.messages.length-1])}catch(t){console.log(t)}this.sending=!1,this.text=""}},async created(){try{const{data:t}=await this.api.get("/board/all",{headers:{authorization:"Bearer "+this.user.token}});this.products2=t.result}catch(t){console.log(t),this.$swal({icon:"error",title:"錯誤",text:"取得商品失敗"})}}},o=r,n=s(1001),c=s(3453),d=s.n(c),l=s(680),m=s(3237),u=s(7118),v=s(2102),h=s(4228),p=s(4497),f=s(1418),x=s(6232),g=s(6428),_=s(2877),b=s(9762),k=s(5978),y=s(4350),C=s(6656),w=(0,n.Z)(o,a,i,!1,null,"42eea683",null),V=w.exports;d()(w,{VBtn:l.Z,VCard:m.Z,VCardActions:u.h7,VCardText:u.ZB,VCol:v.Z,VContainer:h.Z,VDialog:p.Z,VDivider:f.Z,VForm:x.Z,VIcon:g.Z,VRow:_.Z,VSpacer:b.Z,VTextField:k.Z,VTextarea:y.Z,VToolbar:C.Z})}}]);
//# sourceMappingURL=board.6e127155.js.map