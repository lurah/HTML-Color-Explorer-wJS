from fasthtml.common import * # type: ignore
import nm_clr_list as cl
import json

hdrs = (
    Link(rel="icon", type="image/png", href="static/school-bus.png"),
    Link(
        rel="stylesheet",
        href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css",
        type="text/css",
    ),
    Link(rel="stylesheet", href="static/styles.css", type="text/css"),
    Script(src="static/slider.js"),
)

app = FastHTML(pico=False, hdrs=hdrs)
app.mount("/static", StaticFiles(directory="static"), name="static")

def box_color():
    respon = (
        Div(
            Div(Div("rgb(255,255,255)*", id="cmp_clr"), id="belakang"),
            Div(id="depan"),
            Div("* Complement Color", id="cmp_txt"),
            id="wadah",
        ),
        Div(
            Div(cls="column"),
            Div(slider("alpha", 1), cls="column is-narrow"),
            Div(cls="column"),
            cls="columns is-mobile",
        ),
    )
    return respon

def input_color():
    respon = Div(
        Span(
            "COLOR: rgba(",
            cls="has-text-right has-text-link is-size-7 sepan has-text-link",
        ),
        Input(
            type="number",
            min="0",
            max="255",
            step="1",
            id="ip_red",
            cls="angka has-text-link",
        ),
        Span(",", cls="has-text-link"),
        Input(
            type="number",
            min="0",
            max="255",
            step="1",
            id="ip_green",
            cls="angka has-text-link",
        ),
        Span(",", cls="has-text-link"),
        Input(
            type="number",
            min="0",
            max="255",
            step="1",
            id="ip_blue",
            cls="angka has-text-link",
        ),
        Span(",", cls="has-text-link"),
        Input(
            type="number",
            min="0",
            max="1",
            step="0.01",
            id="ip_rgb",
            cls="angka has-text-link",
        ),
        Span(")", cls="has-text-link"),
        P(cls="mb-1"),
        Span("HEX rgba(#", cls="has-text-right is-size-7 sepan has-text-link"),
        Input(
            type="text",
            pattern="[0-9A-Fa-f]+",
            maxlength="8",
            id="hx_rgb",
            cls="has-text-right has-text-link",
        ),
        Span(")", cls="has-text-link"),
        P(cls="mb-3"),
        Span("COLOR: hsla(", cls="has-text-right is-size-7 sepan has-text-link"),
        Input(
            type="number",
            min="0",
            max="360",
            step="1",
            id="ip_hue",
            cls="angka has-text-link",
        ),
        Span(",", cls="has-text-link"),
        Input(
            type="number",
            min="0",
            max="100",
            step="1",
            id="ip_saturation",
            cls="angka has-text-link",
        ),
        Span(",", cls="has-text-link"),
        Input(
            type="number",
            min="0",
            max="100",
            step="1",
            id="ip_lightness",
            cls="angka has-text-link",
        ),
        Span(",", cls="has-text-link"),
        Input(
            type="number",
            min="0",
            max="1",
            step="0.01",
            id="ip_hsl",
            cls="angka has-text-link",
        ),
        Span(")", cls="has-text-link"),
    )
    return respon

def full_box_color():
    respon = Div(box_color(), input_color(), cls="column is-narrow box-color")
    return respon

def slider(judul: str, maks):
    jarak = 1 if judul != "alpha" else 0.01
    respon = Div(
        P(f"{judul.upper()}", cls="has-text-primary-100"),
        Input(type="range", min="0", max=f"{maks}", step=jarak, cls=f"slider {judul}"),
        P(f"{maks}", cls="has-text-primary-100"),
        cls=f"has-text-left box {judul}",
    )
    return respon

def slider_rgb():
    respon = Div(
        slider("red", 255),
        slider("green", 255),
        slider("blue", 255),
        cls="column is-narrow",
    )
    return respon

def slider_hsl():
    respon = Div(
        slider("hue", 360),
        slider("saturation", 100),
        slider("lightness", 100),
        cls="column is-narrow",
    )
    return respon

def rgb_distance(rgb1, rgb2):
    r1, g1, b1 = rgb1
    r2, g2, b2 = rgb2
    return math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)

def closest_named_color(target_rgb):
    min = float("inf")
    clst = "Red"
    clst_pg = "red"
    for klr_i in cl.col_family:
        for name, rgb in getattr(cl, klr_i).items():
            distance = rgb_distance(target_rgb, rgb)
            if distance < min:
                min = distance
                clst = name
                clst_pg = klr_i
    return clst_pg, clst

def tab_item(judul: str, aktif=False):
    respon = Li(
        A(Span(f"{judul}")),
        cls="tab_item" if not aktif else "tab_item is-active",
        id=f"{judul}",
    )
    return respon

def tab_color(all_lists: list, clr_fam, mrg_akhir=False):
    tabs = []
    for list in all_lists:
        tab = tab_item(list) if list != clr_fam else tab_item(list, True)
        tabs.append(tab)
    respon = Div(
        Ul(*tabs),
        cls="tabs is-toggle is-small mb-0" if mrg_akhir else "tabs is-toggle is-small",
    )
    return respon

def grid_color(family):
    kolor_list = getattr(cl, family)
    node_color = []
    for key, value in kolor_list.items():
        fgd = (
            (255 - value[0], 255 - value[1], 255 - value[2])
            if family != "gray"
            else (255, 255, 255)
        )
        node_color.append(
            Div(
                f"{key}\nrgb{str(value).replace(' ', '')}",
                style=f"color: rgb{fgd}; background-color: rgb{value}",
                cls="column has-text-centered is-size-7 grid_color",
            )
        )
    respon = Div(*node_color, id="grid_color", cls="columns is-mobile is-multiline")
    return respon

def name_color_all(red, green, blue):
    target_rgb = (red, green, blue)
    clr_fam, _ = closest_named_color(target_rgb)

    respon = Div(
        Div("Color Family", cls="has-text-weight-bold"),
        tab_color(cl.col_family[:5], clr_fam, True),
        tab_color(cl.col_family[5:], clr_fam),
        Div("List of named-color:", cls="has-text-weight-bold"),
        grid_color(f"{clr_fam}"),
        id="name_color",
        cls="column is-narrow ml-6",
    )
    return respon

def grid_bk_color():
    respon = Div(id="bk_color", cls="columns is-mobile is-multiline ml-4")
    return respon

def wcga_color():
    judul = "The Web Content Accessibility Guidelines (WCAG) Contrast Ratios AA compliance:"
    content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor \
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud \
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure \
        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit \
        anim id est laborum"
    
    respon = Div(
        Div(content, cls="box is-size-7", id="wcga_content", style="background-color: pink"),
        Div(judul,
            Span(" 4.1", id="wcidx", cls="blinking"), P(),
            Span("Foreground Color: "), Span("rgb(255,0,0)", id="fore"),P(),
            Span("Background Color: "), Span("rgb(255,255,255)", id="back"),
            cls="box has-text-primary has-text-weight-bold is-size-7"
        ),
        Div(
            "Sugested ",
            Span("background", id="span_bk_color"),
            Span(" color"),
            cls = "has-text-weight-bold is-size-7 mt-5 mb-2"
        ),
        grid_bk_color(),
        cls = "column is-narrow mt-2 mr-5",
        id = "wcga_color",
    )
    return respon

def kolom():
    respon = Div(
        slider_rgb(),
        slider_hsl(),
        full_box_color(),
        cls="columns is-mobile is-multiline is-centered",
        id="awal",
    ), Div (
        wcga_color(),
        name_color_all(255, 0, 0),
        cls="columns is-mobile is-multiline is-centered",
        id="oawal",
    )
    return respon


@app.route("/", methods=["get"])
def index():
    return H1(
        "HTML Color Explorer", cls="title has-text-centered m-6 has-text-primary"
    ), kolom()

@app.route("/grid_color", methods=["post"])
def grid(elementId: str):
    return grid_color(elementId)

@app.route("/name_color", methods=["post"])
def name(red: int, green: int, blue: int):
    return name_color_all(red, green, blue)

@app.route("/bk_wcga_color", methods=["post"])
def bk_color(bk_color:str, fg_color:str):
    suggested = json.loads(bk_color)
    node_color = []
    if len(suggested) != 0:
        sug = [f"rgb({','.join(map(str, item['rgb']))})" for item in suggested]
        for cl in sug:
            node_color.append(
                Div(
                    cl,
                    style=f"color: {fg_color}; background-color: {cl}",
                    cls="column has-text-centered is-size-7 bw_color",
                )
            )
    respon = Div(*node_color, id="bk_color", cls="columns is-mobile is-multiline")
    return respon

serve()
