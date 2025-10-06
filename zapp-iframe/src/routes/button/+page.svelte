
<script lang="ts">
    import icon from '$lib/assets/openbutton_beta1.svg';
	import { onMount } from 'svelte';
    let open = $state(false);
	
	onMount(()=>{
		window.addEventListener("message", (event) => {
			const msg = event.data;
			if(msg.type === "state"){
				open = msg.state;
			}else if(msg.type === "outsideclick"){
				console.log("outsideclick")
				open = false;
			}
		});
	})
	
</script>

<div style="width: 3.64em; aspect-ratio: 1; display: flex; align-items: center; justify-content: center;">
	<button
		type="button"
		class={`zappbutton ${(open ? 'rotated' : '')} inline-flex justify-center items-center rounded-lg text-white font-bold text-xl shadow-lg hover:bg-orange-600 focus:outline-none transition-all duration-200`}
		id="menu-button"
		style="width: 77%; height: 77%"
		part="openbutton"
		aria-expanded={true}
        aria-label="zapp button"
		aria-haspopup="true"
		onclick={() => {
			open = !open;
			window.parent.postMessage(JSON.stringify({type: "buttonclick"}), "*")
		}}
	>
		<img style="width: 100%; aspect-ratio: 1;" part="zappicon" src={icon} alt="zapp button" />
	</button>
</div>

<style>
	@import '$lib/styles/zapp-v01.css';
</style>
