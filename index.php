<!DOCTYPE html>
<html lang="en">
	<head>
		<title>
			Lucy Murphy &amp; James Draper &mdash; August 27th 2015
		</title>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<link href='http://fonts.googleapis.com/css?family=Dancing+Script:400,700' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="src/css/main.css">
	</head>
	<body class="container" data-spy="scroll" data-target="#main-nav">
		<header>
			<nav id="main-nav" class="navbar navbar-default navbar-fixed-top">
				<div class="container-fluid">
					<!-- Brand and toggle get grouped for better mobile display -->
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand script" href="#home">L&amp;J</a>
					</div>

					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav navbar-right">
							<li><a href="#location">Location</a></li>
							<li><a href="#rsvp">RSVP</a></li>
							<li><a href="#photos">Photos</a></li>
						</ul>
					</div><!-- /.navbar-collapse -->
				</div><!-- /.container-fluid -->
			</nav>
			
			<!-- ko if: app.isAlertVisible() -->
			<div class="alert alert-warning alert-dismissible" role="alert">
			  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			  <strong>Warning!</strong> Better check yourself, you're not looking too good.
			</div>
			<!-- /ko -->
			<!-- ko ifnot: app.isAlertVisible() -->
			<div>NO!!!!!!</div>
			<!-- /ko -->

			<div id="main-jumbotron" class="jumbotron text-center transparent">
				<h1 id="main-header" class="row">
					<span class="col-xs-12 col-md-3 col-md-offset-2 text-center">
						<span class="text-primary pressed">Lucy</span><br>
						<span class="script">Murphy</span> 
					</span>
					<span class="col-xs-12 col-md-2 pressed x-large text-center light">&amp;</span>
					<span class="col-xs-12 col-md-3 text-center">
						<span class="text-primary pressed">James</span><br>
						<span class="script">Draper</span>
					</span>
				</h1>
				<hr>
				<h2 class="script" data-bind="text: app.weddingDateString"></h2>
				
			</div>
		</header>

		<section id="home" class="main-section row">
			<h1 class="ribbon text-center">Celebrate with us</h1>
			<p class="lead">
				This is the main lead paragraph for the whole page. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id blanditiis maxime cupiditate nisi voluptas, porro eligendi rem ea itaque perspiciatis iusto vitae fugiat commodi labore, numquam error impedit tenetur quam. Exercitationem facere ex, recusandae placeat quos reiciendis aliquid? Illum architecto saepe necessitatibus deserunt, dolorem provident blanditiis autem magni possimus, dicta.
			</p>
		</section>

		<section id="location" class="main-section row">
			<h1 class="ribbon text-center">Location</h1>
			
			<widget-map></widget-map>

		</section>
		

		<!-- ko if: app.getDaysToWedding() > 0 -->
		<section id="rsvp" class="main-section row">
			<h1 class="ribbon text-center">RSVP</h1>
			
			<widget-rsvp></widget-rsvp>

		</section>
		<!-- /ko -->

		<section id="photos" class="main-section row">
			<h1 class="ribbon text-center">Photos</h1>
			
			<widget-photos></widget-photos>

		</section>

		<footer class="row">
			<div class="center-block">
				<a class="navbar-brand script" href="#home">L&amp;J</a>
			</div>		
		</footer>

		<script src="src/app/js/require.config.js"></script>
		<script data-main="src/app/js/main" src="src/libs/bower/requirejs/require.js"></script>
		
		

		<script src="src/app/third-party.js"></script>


	</body>
</html>