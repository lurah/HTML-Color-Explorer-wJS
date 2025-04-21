from fasthtml.common import *

hdrs=(Link(rel='icon', type='image/png', href='static/school-bus.png'),
      Link(rel='stylesheet', href='https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css',
      type='text/css'),
      Link(rel='stylesheet', href='static/styles.css', type='text/css'),
      Script(src='static/slider.js'))


app = FastHTML(pico=False, hdrs=hdrs)
app.mount("/static", StaticFiles(directory="static"), name="static")

def slider(judul:str, maks):
    return Div(
                P(f"{judul.upper()}", cls="has-text-primary-100"),
                Input(type="range", min="0", max=f"{maks}", cls=f"slider {judul}"), 
                P(f"VAL: {maks}", cls="has-text-primary-100"),
                cls="has-text-left")


def box_slider(judul1, judul2, maks1, maks2):
    return Div(
                Div(cls="column"),
                Div(slider(f"{judul1}", f"{maks1}"), cls=f"column is-narrow box mx-2 {judul1}"),
                Div(slider(f"{judul2}", f"{maks2}"), cls=f"column is-narrow box mx-2 {judul2}"),
                Div(cls="column"),
                cls="columns is-mobile")

@app.get("/")
def index():              
    return Title("HTML Color Explorer"), \
           Div(
                H1("HTML Color Explorer", cls="title my-6"),
                box_slider("red", "hue", 255, 360),
                box_slider("green", "saturation", 255, 100),
                box_slider("blue", "lightness", 255, 100),
                cls="container has-text-centered")

serve()