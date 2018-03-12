var ip =  'http://localhost/JetsenCourse';
var scheduleId = '1';
var spaceDialogType = 'insert';
$(function () {
        $(".wx_role_ul ul li").on("click", function () {
            var index = $(this).index()
            $(this).addClass("active").siblings().removeClass("active")
            $(".wx_set_guize_ul>div").eq(index).show().siblings().hide();
            initList(index);
        })
    })

/**
 * 点击标签初始化查询方法
 * @param index
 */
function initList(index){
	 switch(index)
     {
     case 0:
    	 break;
     case 1:
    	 break;
     case 2:
    	 findSpaceRuleList();
    	 break;
     case 3:
    	 findClassRuleList();
    	 break;
     case 4:
    	 break;
     default:
    	 
     }
 }

/***********************************************************************************场地规则start**********************************************************************************/
 
/**
 * 查询场地规则列表
 */
 function findSpaceRuleList(){
	 var data = {scheduleId:scheduleId};
	 $.ajax({
		 url: ip+'/rule/spaceRule/findSpaceRule.do',
		 data:data,
		 success:function(res){
			 if(res.status==200){
				 var list = res.data;
				 var html = '';
				 for(var i=0;i<list.length;i++){
					 var tem = list[i];
					 html += '<tr>\
		                         <td>'+(i+1)+'</td>\
		                         <td>'+tem.subjectName+'</td>\
		                         <td>'+tem.lessonMostNum+'</td>\
		                         <td><span class="wx_lanzi" onclick='+"'"+'updateSpaceDialog('+JSON.stringify(tem)+')'+"'"+'><em class="index_paikeicon"></em>修改</span><span class="wx_hongzi" onclick="deleteSpaceRule('+"'"+tem.id+"'"+')"><em class="index_delet"></em>删除</span> </td>\
		                     </tr>';
				 }
				 $('#spaceRuleTbody').html(html);
			 }
		 }
	 })
 }
 /**
  * 添加场地规则弹出框
  * @param tem
  */
 function insertSpaceDialog(){
	 spaceDialogType = 'insert';
	 $('#spaceDialogTitle').html('添加场地规则');
	 $('#spaceRuleDialog').show();
	 $(".wx_set_changdi_tc li i").empty();
	 fundSubjectList(null,'insert');
	 $('#spaceRuleClassNum').val('');
 }
 
 /**
  * 添加场地规则
  * @param tem
  */
 function insertSpaceRule(){
	 var data={};
	 var url = ip+'/rule/spaceRule/insertSpaceRule.do';
	 if(spaceDialogType == 'update'){
		 url = ip+'/rule/spaceRule/updateSpaceRule.do';
		 data['id']= $('#spaceRuleId').val();
	 }
	 var $Subject = $(".wx_set_changdi_tc li i .active");
	 if($Subject.length==0){
		 alert('请选择科目!')
		 return;
	 }
	 var subjectId = $Subject.attr('id');
	 var subjectName = $Subject.text();
	 var lessonMostNum = $('#spaceRuleClassNum').val();
	 if(lessonMostNum == ""){
		 alert('请输入科目在同一节次最多可排班级数!')
		 return;
	 }
	 $.extend(true,data,{scheduleId:scheduleId,subjectId:subjectId,subjectName:subjectName,lessonMostNum:lessonMostNum})
	 $.ajax({
		 url:url,
		 data:data,
		 success:function(res){
			 if(res.status==200){
				 alert('操作成功!');
				 $('#spaceRuleDialog').hide();
				 findSpaceRuleList();
			 }else{
				 alert(res.msg);
			 }
		 }
	 })
 }
 
 /**
  * 修改场地规则弹出框
  * @param tem
  */
 function updateSpaceDialog(spaceRule){
	 spaceDialogType = 'update';
	 $('#spaceDialogTitle').html('修改场地规则');
	 $(".wx_set_changdi_tc li i").empty();
	 $('#spaceRuleDialog').show();
	 fundSubjectList(spaceRule,'update');
	 $('#spaceRuleClassNum').val(spaceRule.lessonMostNum);
	 $('#spaceRuleId').val(spaceRule.id);
 }
 
 /**
  * 删除场地规则
  */
 function deleteSpaceRule(id){
	 $.ajax({
		 url:ip+'/rule/spaceRule/deleteSpaceRule.do',
		 data:{id:id},
		 success:function(res){
			 if(res.status==200){
				 alert('操作成功');
				 findSpaceRuleList();
			 }
		 }
	 })
 }
 
 /**
  * 取消按钮
  * @param tem
  */
 function cancel(scpoe){
	 $(scpoe.parentNode.parentNode.parentNode.parentNode).hide()
 }
 
 /**
  * 根据课表Id查询科目
  * @param spaceRule
  */
 function fundSubjectList(spaceRule,type){
	 var data = {scheduleId:scheduleId};
	 $.ajax({
		 url:ip+'/rule/spaceRule/findSubjectBycheduleId.do',
		 data:data,
		 success:function(res){
			 if(res.status==200){
				 var html ='';
				 var subjectList = res.data;
				 if(type=='update'){
					 var subject = {subjectId:spaceRule.subjectId,subjectName:spaceRule.subjectName};
					 subjectList.splice(0,0,subject)
				 }
				 for(var i=0;i<subjectList.length;i++){
					 var tem = subjectList[i];
					 var active = spaceRule!= null&&spaceRule.subjectId == tem.subjectId?'active':'';
					 html += '<span id="'+tem.subjectId+'" class="'+active+'" >'+tem.subjectName+'</span>';
					
				 }
				 $('#spaceDialogSubject').html(html);
				 $(".wx_set_changdi_tc li i span").on("click", function () {
			         $(this).addClass("active").siblings().removeClass("active")
			         var classNum = spaceRule!= null&&$(this).attr('id')==spaceRule.subjectId?spaceRule.lessonMostNum:'';
			         $('#spaceRuleClassNum').val(classNum);
			     })
			 }
		 }
	 })
 }
 
 /***********************************************************************************场地规则end**********************************************************************************/
 
 
 /***********************************************************************************合班规则start**********************************************************************************/
 /**
  * 查询合班规则列表
  */
  function findClassRuleList(){
 	 var data = {scheduleId:scheduleId};
 	 $.ajax({
 		 url: ip+'/rule/classRule/findClassRule.do',
 		 data:data,
 		 success:function(res){
 			 if(res.status==200){
 				 var list = res.data;
 				 var html = '';
 				 for(var i=0;i<list.length;i++){
 					 var tem = list[i];
 					html += '<tr>\
		                         <td class="kebiaoname wx_heban_width"><em class="kebiaoicon"></em>'+tem.className+'</td>\
		                         <td class="wx_cuo_width_td">';
 					 			if(tem.childrenList.length>0){
 					 				for(var n=0;n<tem.childrenList.length;n++){
 					 					var sonTem = tem.childrenList[n];
 					 					html+= '<span id="'+sonTem.id+'">'+sonTem.className+'<em onclick="deleteClassRuleClass('+"'"+sonTem.id+"'"+')" class="cuoicon"></em></span>'
 					 				}
 					 			}
 					html+= '	 </td>\
		                         <td>\
		                             <button onclick="deleteClassRule('+"'"+tem.id+"'"+')" class="index_hongse"><em class="index_delet"></em>删除</button>\
		                         </td>\
		                     </tr>';
 				 }
 				 $('.wx_heban_table').html(html);
 			 }
 		 }
 	 })
  }
 
 /***********************************************************************************合班规则end**********************************************************************************/