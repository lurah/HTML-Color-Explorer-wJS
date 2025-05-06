from fasthtml.common import *
from nm_clr_list import col_family

hdrs=(Link(rel='icon', type='image/png', href='static/school-bus.png'),
      Link(rel='stylesheet', href='https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css',
      type='text/css'),
      #Link(rel='stylesheet', href='static/modbulma.css', type='text/css'),
      Link(rel='stylesheet', href='static/styles.css', type='text/css'),
      Script(src='static/slider.js'),
      #Script(src="https://kit.fontawesome.com/c880c9afbf.js", crossorigin="anonymous")
    )


app = FastHTML(pico=False, hdrs=hdrs)
app.mount("/static", StaticFiles(directory="static"), name="static")

def box_color():
    respon = \
        Div(
            Div(id="belakang"),
            Div(id="depan"),
            id="wadah"), \
        slider("alpha", 1)
    return respon
        
def input_color():
    respon = \
        Div(
            Span(f"COLOR: ", cls="has-text-left is-size-7"),
            Span(f"rgba(", cls="has-text-right is-size-7 sepan"),
            Input(type="number",min="0",max="255",step="1",id="ip_red",cls="angka"),
            Span(f","),
            Input(type="number",min="0",max="255",step="1",id="ip_green",cls="angka"),
            Span(f","),
            Input(type="number",min="0",max="255",step="1",id="ip_blue",cls="angka"),
            Span(f","),
            Input(type="number",min="0",max="1",step="0.01",id="ip_rgb",cls="angka"),
            Span(f")"),
            P(),
            Span(f"COLOR: ", cls="has-text-left is-size-7"),
            Span(f"hsla(", cls="has-text-right is-size-7 sepan"),
            Input(type="number",min="0",max="360",step="1",id="ip_hue",cls="angka"),
            Span(f","),
            Input(type="number",min="0",max="100",step="1",id="ip_saturation",cls="angka"),
            Span(f","),
            Input(type="number",min="0",max="100",step="1",id="ip_lightness",cls="angka"),
            Span(f","),
            Input(type="number",min="0",max="1",step="0.01",id="ip_hsl",cls="angka"),
            Span(f")")
        )
    return respon

def full_box_color():
    respon = Div(
        box_color(),
        input_color(),
        cls="column is-narrow box-color"
    )    
    return respon
    
def slider(judul:str, maks):
    jarak = 1 if judul != 'alpha' else .01
    respon = Div(
        P(f"{judul.upper()}", cls="has-text-primary-100"),
        Input(type="range", min="0", max=f"{maks}", step=jarak, cls=f"slider {judul}"), 
        P(f"{maks}", cls="has-text-primary-100"),
        cls=f"has-text-left box {judul}")
    return respon

def slider_rgb():
    respon = Div(
        slider("red", 255),
        slider("green", 255),
        slider("blue", 255),
        cls="column is-narrow"
    )
    return respon

def slider_hsl():
    respon = Div(
        slider("hue", 360),
        slider("saturation", 100),
        slider("lightness", 100),
        cls="column is-narrow"
    )
    return respon

def tab_item(judul:str):
    respon = Li(
        A(Span(f"{judul}")),
        cls="tab_item",
        id=f"{judul}"
    )
    return respon

def name_color(all_lists:list, mrg_akhir=False):
    tabs = []
    for list in all_lists:
        tabs.append(tab_item(list))
    
    respon = Div(
        Ul(*tabs),
        cls = "tabs is-toggle is-small mb-0" if mrg_akhir else "tabs is-toggle is-small"
    )
    return respon

def name_color_all():
    satu = col_family[:5]
    dua = col_family[5:]

    respon = Div(
        name_color(satu,True),
        name_color(dua),
        Div("Ini yang Lain lagi", id="name_color", cls="title has-text-center"),
        cls="column is-narrow"
    )
    return respon

def kolom():
    respon = Div(
        slider_rgb(),
        slider_hsl(),
        full_box_color(),
        name_color_all(),
        cls="columns is-mobile is-multiline is-centered"
    )
    return respon

@app.get("/")
def index():
    return H1("Judul-judulan", cls="title"), kolom()

@app.post("/name_color")
def name(elementId:str):
    return H1(f"Ini JavaScript HTMX dari {elementId}")

serve()