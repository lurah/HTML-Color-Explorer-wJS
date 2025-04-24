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
        P(f"VAL: {maks}", cls="has-text-primary-100"),
        cls="has-text-left")
    return respon

def box_slider(judul1, judul2, maks1, maks2):
    respon = Div(
        Div(slider(f"{judul1}", f"{maks1}"), cls=f"column is-narrow box mx-2 {judul1}"),
        Div(slider(f"{judul2}", f"{maks2}"), cls=f"column is-narrow box mx-2 {judul2}"),
        cls="columns is-mobile")
    return respon

def wadah_slider():
    respon = Div(
        box_slider("red", "hue", 255, 360),
        box_slider("green", "saturation", 255, 100),
        box_slider("blue", "lightness", 255, 100),
        cls="column is-narrow")
    return respon

def slider_and_box():
    respon = Div(
        Div(cls="column"),
        wadah_slider(),
        box_color(),
        Div(cls="column"),
        cls="columns is-mobile")
    return respon

@app.get("/")
def index():
    return Title("HTML Color Explorer"), \
           Div(
               H1("HTML Color Explorer", cls="title my-6"),
               slider_and_box(),
               cls="container has-text-centered")
    
serve()