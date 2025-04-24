from fasthtml.common import *

hdrs=(Link(rel='icon', type='image/png', href='static/school-bus.png'),
      Link(rel='stylesheet', href='https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css',
      type='text/css'),
      Link(rel='stylesheet', href='static/styles.css', type='text/css'),
      Script(src='static/slider.js'))


app = FastHTML(pico=False, hdrs=hdrs)
app.mount("/static", StaticFiles(directory="static"), name="static")

def box_color():
    respon = Div(
        Div(
            Div(id="belakang", cls="use_bor"),
            Div(id="depan", cls="use_bor"),
            id="wadah", cls="use_bor"),
        Div(
            P("Alpha: ", cls="label_alpha"),
            Input(type="range", min="0", max="100", id="slider_alpha"),
            id="angka_alpha", cls="use_bor"),
        cls="column is-narrow")
    return respon

def wadah_box_color():
    respon = Div(
        Div(cls="column"),
        box_color(),
        Div(cls="column"),
        cls="columns is-mobile")
    return respon

def slider(judul:str, maks):
    respon = Div(
        P(f"{judul.upper()}", cls="has-text-primary-100"),
        Input(type="range", min="0", max=f"{maks}", cls=f"slider {judul}"), 
        P(f"VAL: {maks}", cls="has-text-primary-100"),
        cls="has-text-left")
    return respon

def box_slider(judul1, judul2, maks1, maks2):
    respon = Div(
        Div(cls="column"),
        Div(slider(f"{judul1}", f"{maks1}"), cls=f"column is-narrow box mx-2 {judul1}"),
        Div(slider(f"{judul2}", f"{maks2}"), cls=f"column is-narrow box mx-2 {judul2}"),
        Div(cls="column"),
        cls="columns is-mobile")
    return respon

def wadah_slider() {
    respon = Div(
        Div(
            cls="columns is-mobile"),
        cls="column is-narrow")
}

def slider_and_box():
    respon = Div(
        Div(cls="column"),

        box_color(),
        Div(cls="column"),
        cls="columns is-mobile")

@app.get("/")
def index():
    return Title("HTML Color Explorer"),wadah_box_color()    

    """def index():              
    return Title("HTML Color Explorer"), \
           Div(
                H1("HTML Color Explorer", cls="title my-6"),
                box_slider("red", "hue", 255, 360),
                box_slider("green", "saturation", 255, 100),
                box_slider("blue", "lightness", 255, 100),
                cls="container has-text-centered")
    """


serve()