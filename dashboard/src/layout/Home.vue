<template>
    <div class="container">
			<div class="main_title">
			<img src="img/ussd.png" alt="">
            <br><br><br>
			
			</div>
			<div class="row">
				<div class="col-lg-3 col-md-6">
					<a href="#0" class="box_cat_home">
						
						<img src="img/health.png" width="100" height="60" alt="">
						
						<ul class="clearfix">
								<li>USSD *384*88812#</li>
                        <li></li>
							
						</ul>
					</a>
				</div>
				<div class="col-lg-3 col-md-6">
					<a href="#0" class="box_cat_home">
						
						<img src="img/map.png" width="60" height="60" alt="">
						
						<ul class="clearfix">
							<li>Accurate Coordinate</li>
                        <li></li>
							
						</ul>
					</a>
				</div>
				<div class="col-lg-3 col-md-6">
					<a href="#0" class="box_cat_home">
						
						<img src="img/realtime.png" width="60" height="60" alt="">
					
						<ul class="clearfix">
							<li>Realtime </li>
                        <li></li>
							
						</ul>
					</a>
				</div>
				<div class="col-lg-3 col-md-6">
					<router-link to="/home"  class="box_cat_home">
					
						<img src="img/dashboard.png" width="60" height="60" alt="">
					
						<ul class="clearfix">
						<li>Visit Dashboard</li>
                        <li></li>
							
						</ul>
					</router-link> 
				</div>
				
			
		</div>
	
    </div>
</template>

<script>
export default {
    name:'Home'
}
</script>

<style>

</style>
