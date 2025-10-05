<script lang="ts">
	import Dropdown from "$lib/components/Dropdown.svelte";
	import { onMount } from "svelte";


	let position = $state({left: 0, top: 0});
	let open = $state(false);
	

	onMount(()=>{
		console.log("mounted")

		window.addEventListener("message", (event) => {
			// if (event.origin !== "http://localhost:3000") return; // security check
			console.log("Child received:", event.data);
			const msg = event.data;
			if(msg.type === "rect"){
				position = {left: event.data.rect.x, top: event.data.rect.y}
				open = true;
				console.log("opened")
			}else if(msg.type === "outsideclick"){
				console.log("outsideclick")
				open = false;
			}
		});



	})


</script>

<div id="dropdown">
	{#if open}
		<Dropdown />
	{/if}
</div>

<style>
	@import '$lib/styles/zapp-v01.css';
</style>
