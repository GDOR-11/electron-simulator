/** @type {HTMLCanvasElement} */
const pendulum_canvas = document.getElementById("pendulum-canvas");
/** @type{HTMLCanvasElement} */
const trail_canvas = document.getElementById("trail-canvas");
const trail_ctx = trail_canvas.getContext("2d", { willReadFrequently: true });

function resize() {
    pendulum_canvas.width = window.innerWidth;
    pendulum_canvas.height = window.innerHeight;


    if(window.innerWidth <= trail_canvas.width && window.innerHeight <= trail_canvas.height) return;

    // we don't want the trail to get erased, so before resizing we temporarily store the trail so we can redraw it soon next
    let image_data = trail_ctx.getImageData(0, 0, trail_canvas.width, trail_canvas.height);
    trail_canvas.width = Math.max(trail_canvas.width, window.innerWidth);
    trail_canvas.height = Math.max(trail_canvas.height, window.innerHeight);
    trail_ctx.putImageData(image_data, 0, 0);
}
resize();
window.addEventListener("resize", resize);
