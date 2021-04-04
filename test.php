<!DOCTYPE html>
<html>
<head>
	<title></title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.0/paper-core.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js"></script>
	<link rel="stylesheet" type="text/css" href="./cursor.css"/>
</head>


<body class="body l-body">
  <main class="l-main">
    <div class="page__inner">
      
      <!-- The cursor elements --> 
      	<!-- Point du curseur (fonctionne sans le canvas) -->
	    	<div class="cursor cursor--small"></div>
	    <!-- Cercle du curseur (ne fonctionne pas sans le cursor) -->
	    	<canvas class="cursor cursor--canvas" resize></canvas>


      	<nav class="nav">
			<a href="#" class="link">
		  		<svg class="settings-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
			   		<g class="settings-icon__group settings-icon__group--1">
				     	<line class="settings-icon__line" x1="79.69" y1="16.2" x2="79.69" y2="83.8"/>
				     	<rect class="settings-icon__rect" x="73.59" y="31.88" width="12.19" height="12.19"/>
				    </g>
				   	<g class="settings-icon__group settings-icon__group--2">
				     	<line class="settings-icon__line" x1="50.41" y1="16.2" x2="50.41" y2="83.8"/>
				     	<rect class="settings-icon__rect" x="44.31" y="54.33" width="12.19" height="12.19"/>
				  	</g>
				   	<g class="settings-icon__group settings-icon__group--3">
				     	<line class="settings-icon__line" x1="20.31" y1="16.2" x2="20.31" y2="83.8"/>
				     	<rect class="settings-icon__rect" x="14.22" y="26.97" width="12.19" height="12.19"/>
				   	</g>
		  		</svg></a>
		</nav>


    </div>
  </main>
</body>
<script type="text/javascript" src="./cursor.js"></script>
</html>