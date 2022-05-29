let pa = [],gr = 2,pindex=1,chue=-23;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	background(0);
	colorMode(HSB);
	
	for (let i=0;i<2010;i++) pa.push([0.5]);
}

function draw() {
	for (let i=0;i<20;i++) {
		colorMode(HSB)
		let scol = color(chue,80,100);
		scol.setAlpha(0.5);
	stroke(scol);
	let ind = round(1000*(gr-2));
	pa[ind].push(pa[ind][pindex-1]*gr*(1-pa[ind][pindex-1]))
	if (ind>0) {
		line(
			round(map(gr-0.001,2,4,0,width)),
			round(map(pa[ind-1][pindex],0,1,height,0)),
			round(map(gr,2,4,0,width)),
			round(map(pa[ind][pindex],0,1,height,0)),
		);
	}
	gr+=0.001;
	if (gr >= 4) {
			gr=2;
			pindex++;
			chue+=23;
			chue%=360;
	colorMode(RGB)
	background(0,0,0,20);
	}
	}
}