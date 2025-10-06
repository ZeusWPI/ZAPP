<script lang="ts">
	import Dropdown from "$lib/components/Dropdown.svelte";
	import { onMount } from "svelte";

	let open = $state(false);
	let loaded = $state(false);
	let loadimages = $state(false);
	

	onMount(()=>{
		console.log("mounted")

		// window.addEventListener("message", (event) => {
		// 	// if (event.origin !== "http://localhost:3000") return; // security check
		// 	console.log("Child received:", event.data);
		// 	const msg = event.data;
		// 	if(msg.type === "rect"){
		// 		position = {left: event.data.rect.x, top: event.data.rect.y}
		// 		open = !open;
		// 		loaded = true;
		// 		loadimages = true;
		// 		console.log("opened")
		// 		window.parent.postMessage(JSON.stringify({type: "state", state: open}), "*")
		// 	}else if(msg.type === "outsideclick"){
		// 		console.log("outsideclick")
		// 		open = false;
		// 		window.parent.postMessage(JSON.stringify({type: "state", state: open}), "*")
		// 	}
		// });



	})


</script>

<div id="dropdown">
	<Dropdown bind:open={open} loadimages={true} />
</div>

<style>
	@import '$lib/styles/zapp-v01.css';
</style>
