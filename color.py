from fasthtml.common import *
import nm_clr_list as cl

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
            Span("COLOR: rgba(", cls="has-text-right has-text-link is-size-7 sepan has-text-link"),
            Input(type="number",min="0",max="255",step="1",id="ip_red",cls="angka has-text-link"),
            Span(",", cls="has-text-link"),
            Input(type="number",min="0",max="255",step="1",id="ip_green",cls="angka has-text-link"),
            Span(",", cls="has-text-link"),
            Input(type="number",min="0",max="255",step="1",id="ip_blue",cls="angka has-text-link"),
            Span(",", cls="has-text-link"),
            Input(type="number",min="0",max="1",step="0.01",id="ip_rgb",cls="angka has-text-link"),
            Span(")", cls="has-text-link"),
            P(cls="mb-1"),
            Span("HEX rgba(#", cls="has-text-right is-size-7 sepan has-text-link"),
            Input(type="text",pattern="[0-9A-Fa-f]+",maxlength="8",id="hx_rgb", cls="has-text-link"),
            Span(")", cls="has-text-link"),
            P(cls="mb-3"),
            Span("COLOR: hsla(", cls="has-text-right is-size-7 sepan has-text-link"),
            Input(type="number",min="0",max="360",step="1",id="ip_hue",cls="angka has-text-link"),
            Span(",", cls="has-text-link"),
            Input(type="number",min="0",max="100",step="1",id="ip_saturation",cls="angka has-text-link"),
            Span(",", cls="has-text-link"),
            Input(type="number",min="0",max="100",step="1",id="ip_lightness",cls="angka has-text-link"),
            Span(",", cls="has-text-link"),
            Input(type="number",min="0",max="1",step="0.01",id="ip_hsl",cls="angka has-text-link"),
            Span(")", cls="has-text-link")
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

def rgb_distance(rgb1, rgb2): 
        r1, g1, b1 = rgb1
        r2, g2, b2 = rgb2
        return math.sqrt((r1 - r2)**2 + (g1 - g2)**2 + (b1 - b2)**2)
    
def closest_named_color(target_rgb):
        min = float("inf")
        clst = None
        for klr_i in cl.col_family:
            for name, rgb in getattr(cl, klr_i).items():
                distance = rgb_distance(target_rgb, rgb)
                if distance < min:
                    min = distance
                    clst = name
                    clst_pg = klr_i
        return clst_pg, clst

def tab_item(judul:str, aktif=False):
    respon = Li(
        A(Span(f"{judul}")),
        cls="tab_item" if not aktif else "tab_item is-active",
        id=f"{judul}")
    return respon

def tab_color(all_lists:list, clr_fam, mrg_akhir=False):
    tabs = []
    for list in all_lists:
        tab = tab_item(list) if list != clr_fam else tab_item(list, True)
        tabs.append(tab)
    respon = Div(
        Ul(*tabs),
        cls = "tabs is-toggle is-small mb-0" if mrg_akhir else "tabs is-toggle is-small"
    )
    return respon

def grid_color(family):
    kolor_list = getattr(cl,family)
    node_color = []
    for key,value in kolor_list.items():
        fgd = (255 - value[0], 255 - value[1], 255 - value[2]) \
            if family != "gray" else (255,255,255)
        node_color.append(
            Div(
                f"{key}\nrgb{str(value).replace(" ","")}",
                style=f"color: rgb{fgd}; background-color: rgb{value}",
                cls="column has-text-centered is-size-7"
            )
        )
    respon = Div(
        *node_color,
        id="grid_color",
        cls="columns is-mobile is-multiline",
    )
    return respon

def name_color_all(red, green, blue):
    target_rgb = (red, green, blue)
    clr_fam, _ = closest_named_color(target_rgb)
        
    respon = Div(
        tab_color(cl.col_family[:5], clr_fam, True),
        tab_color(cl.col_family[5:], clr_fam),
        Div("List of named-color:", cls="has-text-weight-bold"),
        grid_color(f"{clr_fam}"),
        id="name_color",
        cls="column is-narrow"
    )
    return respon

def kolom():
    respon = Div(
        slider_rgb(),
        slider_hsl(),
        full_box_color(),
        name_color_all(255,0,0),
        cls="columns is-mobile is-multiline is-centered"
    )
    return respon

@app.get("/")
def index():
    return H1("HTML Color Explorer", cls="title has-text-centered m-6"), kolom()

@app.post("/grid_color")
def grid(elementId:str):
    return grid_color(elementId)

@app.post("/name_color")
def name(red:int, green:int, blue:int):
    return name_color_all(red, green, blue)

serve()
