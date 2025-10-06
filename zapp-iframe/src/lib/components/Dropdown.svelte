<script lang="ts">
	import { onMount } from 'svelte';

	let { open = $bindable(), loadimages } = $props();

	const apps = [
		{ img: 'git.png', url: 'https://git.zeus.gent', tooltip: 'Git', visible: false },
		{
			img: 'zess.svg',
			url: 'https://zess.zeus.gent',
			tooltip: 'ZESS: Kelder logs',
			visible: false
		},
		{
			img: 'Mattermost_icon_denim.svg',
			url: 'https://mattermost.zeus.gent',
			class: 'mattermost',
			tooltip: 'Chat',
			visible: false
		},
		{
			img: 'haldis_black.png',
			url: 'https://haldis.zeus.gent',
			tooltip: 'Haldis: Eten bestellen',
			visible: false
		},
		{ img: 'tap.ico', url: 'https://tap.zeus.gent', tooltip: 'TAP: Drank kopen', visible: false },
		{ img: 'tab.ico', url: 'https://tab.zeus.gent', tooltip: 'TAB: Geld beheren', visible: false },
		{ img: 'zeus.svg', url: 'https://zeus.gent', tooltip: 'Zeus site', visible: false },
		{
			img: 'codimd.png',
			url: 'https://codimd.zeus.gent',
			tooltip: 'CodiMD: Notities',
			visible: false
		},
		{
			img: 'profile_nobg.png',
			url: 'https://zauth.zeus.gent',
			class: 'profile',
			tooltip: 'Zauth profiel',
			visible: false
		}
	];

	let loaded: { [key: string]: boolean } = $state({});
	let root: HTMLElement;

	onMount(() => {
		console.log('mounted dropdown');
		console.log(root.getBoundingClientRect());
		if (root.getBoundingClientRect().height != 0) {
			window.parent.postMessage(
				JSON.stringify({ type: 'dropdown-box', box: root.getBoundingClientRect() }),
				'*'
			);
		}

	});
</script>

<div
	class="dropdown w-95 absolute z-10 mt-2 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
	role="menu"
	aria-orientation="vertical"
	aria-labelledby="menu-button"
	part="dropdown"
	bind:this={root}
	onload={() => {
		console.log('sending rect');
		window.parent.postMessage(
			JSON.stringify({ type: 'dropdown-box', box: root.getBoundingClientRect() }),
			'*'
		);
	}}
>
	<div class="topbar">
		<div class="button buttona" title="Zeus App Picker Portal">ZAPP V1</div>
		<div class="button buttonb" title="coming soon™">CONFIG</div>
		<div class="button buttonc" title="coming soon™">LOGIN</div>
		<a href="https://git.zeus.gent/roparet/zapp" target="_blank">
			<div class="button buttond">SOURCE</div>
		</a>
		<button
			class="button buttonpower"
			type="button"
			aria-label="Close"
			onclick={() => {
				open = false;
				window.parent.postMessage(JSON.stringify({ type: 'state', state: open }), '*');
			}}
		>
			⏻
		</button>
	</div>
	<div class="bborder bborder1">
		<div class="dborder dborder1">
			<div class="dborder dborder3">
				<div class="dborder dborder4">
					<div class="cborder1 container p-4">
						<div class="noisyspectrumbg absolute inset-0 -z-10 rounded-md"></div>
						<div class="grid grid-cols-3 gap-5" role="none">
							{#each apps as app, i}
								<div class="w-25 h-25">
									<a
										href={app.url}
										target="_blank"
										class="w95in1 w-25 h-25 style absolute"
										aria-label={app.img}
										title={app.tooltip}
									>
										<div class="bborder bborder1">
											<div class="bborder bborder2">
												<div class="bborder bborder3">
													<div class="bborder bborder4"></div>
												</div>
											</div>
										</div>
									</a>

									<div class="icontainer absolute">
										<button
											class="w-25 h-25 flex items-center justify-center rounded-md font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
											role="menuitem"
											aria-label={app.img}
										>
											{#if loadimages}
												<img
													src={`/images/services/${app.img}`}
													alt={app.img}
													onload={(target) => {
														loaded[i] = true;
														loaded = { ...loaded };
													}}
													class={'w95icon easeload ' +
														(loaded[i] ? 'visible ' : '') +
														(app.class ?? '')}
												/>
											{/if}
										</button>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<svg width="0" height="0" aria-hidden="true">
	<filter id="grain-flat" color-interpolation-filters="sRGB">
		<feTurbulence type="fractalNoise" baseFrequency="0.514" numOctaves="4" seed="21" result="noise"
		></feTurbulence>

		<feComposite
			in="noise"
			in2="SourceGraphic"
			operator="arithmetic"
			k1="0"
			k2="0.4"
			k3="1.0"
			k4="0"
		></feComposite>
	</filter>
</svg>

<svg width="0" height="0" aria-hidden="true">
	<filter id="icongrain" color-interpolation-filters="sRGB">
		<feTurbulence type="fractalNoise" baseFrequency="0.514" numOctaves="4" seed="21" result="noise2"
		></feTurbulence>

		<feComposite
			in="noise2"
			in2="SourceGraphic"
			operator="arithmetic"
			k1="0.7"
			k2="0"
			k3="1.0"
			k4="0"
		></feComposite>
	</filter>
</svg>

<style>
	@import '$lib/styles/zapp-v01.css';
</style>
