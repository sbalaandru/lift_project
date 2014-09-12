// JavaScript Document
function loadGymName()
{
	$.getJSON("http://base2.in/creativeengineer_folder_backup/webservice/Gym_rush/gym_list.php?key=1",function(data)
	{
		var obj = $.parseJSON(JSON.stringify(JSON.stringify(data))); 
    	var jsonData = JSON.parse(obj);
		for (var i in jsonData.gym_lists) 
    	{
			var gymList = jsonData.gym_lists[i];
			var listValue = '<option value="'+gymList.profile_id+':'+gymList.gym_id+'">'+gymList.gym_name+'</option>';	
							
			$("#gymName").append(listValue);
		}
	});
}

function getSelectValue()
{	
	var selectVal = $('#gymName').val();  
	var finalVal = selectVal.split(":",1);
	//alert(selectVal);
	$("#gymLocation").html("");
	$.getJSON("http://base2.in/creativeengineer_folder_backup/webservice/Gym_rush/gym_location.php?key="+finalVal,function(data)
	{
		var obj = $.parseJSON(JSON.stringify(JSON.stringify(data))); 
    	var jsonData = JSON.parse(obj);
		for (var i in jsonData.gym_location) 
    	{
			var gymLocation = jsonData.gym_location[i];
			var listValue = '<option value="'+gymLocation.branch_id+'">'+gymLocation.gym_location+'</option>';	
							
			$("#gymLocation").append(listValue);
		}
	});
}

function sendGymInfo()
{
	var profileId = $("#gymName").val().split(":")[0];
	var gymId = $("#gymName").val().split(":")[1];
	var branchId = $('#gymLocation').val(); 
	alert(profileId+" -- "+gymId+" -- "+branchId);
   	$.post("http://base2.in/creativeengineer_folder_backup/webservice/Gym_rush/update_gym_details.php?user_id=user2&gym_id="+gymId+"&branch_id="+branchId,function(data,status)
	{	
		var obj = $.parseJSON(JSON.stringify(data));
		var jsonData = JSON.parse(obj);
		for (var i in jsonData.update_gym_details) 
		{
			var update_gym_details = jsonData.update_gym_details[i];
			//alert("Registration  :   "+send_request);  
			//alert(update_gym_details.success);
			//alert(update_gym_details.error);
		}  
	});			
}