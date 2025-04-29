from fasthtml.common import *

hdrs=(Link(rel='icon', type='image/png', href='static/school-bus.png'),
      Link(rel='stylesheet', href='https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css',
      type='text/css'),
      #Link(rel='stylesheet', href='static/modbulma.css', type='text/css'),
      Link(rel='stylesheet', href='static/styles.css', type='text/css'),
      Script(src='static/slider.js'))


app = FastHTML(pico=False, hdrs=hdrs)
app.mount("/static", StaticFiles(directory="static"), name="static")

def box_color():
    respon = Div(
        Div(
            Div(id="belakang"),
            Div(id="depan"),
            id="wadah", cls="use_bor"),
        Div(
            P("ALPHA: ", cls="lbl_alpha"),
            Input(type="range", min="0", max="100", id="slider_alpha"),
            P("100%", cls="lbl_alpha"),
            cls="mb-4"),
        Div(
            Label(f"COLOR: rgba(", fr="ip_red", cls="has-text-left is-size-7"),
            Input(type="number",min="0",max="255",step="1",id="ip_red",cls="angka"),
            Span(f","),
            Input(type="number",min="0",max="255",step="1",id="ip_green",cls="angka"),
            Span(f","),
            Input(type="number",min="0",max="255",step="1",id="ip_blue",cls="angka"),
            Span(f","),
            Input(type="number",min="0",max="1",step="0.01",id="ip_rgb",cls="angka"),
            Span(f")"),
            P(),
            Label(f"COLOR: hsla(", fr="ip_hue", cls="has-text-left is-size-7"),
            Input(type="number",min="0",max="360",step="1",id="ip_hue",cls="angka"),
            Span(f","),
            Input(type="number",min="0",max="100",step="1",id="ip_saturation",cls="angka"),
            Span(f","),
            Input(type="number",min="0",max="100",step="1",id="ip_lightness",cls="angka"),
            Span(f","),
            Input(type="number",min="0",max="1",step="0.01",id="ip_hsl",cls="angka"),
            Span(f")")),
        cls="column is-narrow")
    return respon

def slider(judul:str, maks):
    respon = Div(
        P(f"{judul.upper()}", cls="has-text-primary-100"),
        Input(type="range", min="0", max=f"{maks}", cls=f"slider {judul}"), 
        P(f"{maks}", cls="has-text-primary-100"),
        cls=f"has-text-left box {judul}")
    return respon

def kolom():
    respon = Div(
        Div(
            slider("red", 255),
            slider("green", 255),
            slider("blue", 255),
            cls="column is-narrow"
        ),
        Div(
            slider("hue", 360),
            slider("saturation", 100),
            slider("lightness", 100),
            cls="column is-narrow"
        ),
        box_color(),
        Div("Ini yang Lain lagi", cls="title column is-narrow"),
        cls="columns is-mobile is-multiline is-centered"
    )
    return respon

@app.get("/")
def index():
    return H1("Judul-judulan", cls="title"), kolom()

serve()