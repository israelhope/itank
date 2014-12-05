<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Tank Level library for Israel Rocha</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="./itank.css">
</head>
<body>
	<div class="container">
		<div class="tanklevelbig oil-tank">
			<img src="tank2.min.jpg" alt="Nivel">
			<div class="customtank" style="width:30px" data-value="75"></div>
		</div>
	</div>
	<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
	<script src="./jquery.itank.js"></script>
	<script>
		$('.customtank').itank();

		$('#update').click(function(){
			var p = $('#progress').val();
			if(p)
				$('.customtank').itank(p);
			$('#progress').val('');
		});
		$('#progress').keyup(function (e){
			if(e.keyCode == 13){
				$("#update").trigger('click');
			}
		});
	</script>
</body>
</html>