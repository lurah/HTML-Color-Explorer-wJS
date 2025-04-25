from fasthtml.common import *

hdrs=(Link(rel='icon', type='image/png', href='static/school-bus.png'),
      #Link(rel='stylesheet', href='https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css',
      #type='text/css'),
      Link(rel='stylesheet', href='static/modbulma.css', type='text/css'),
      Link(rel='stylesheet', href='static/kolom.css', type='text/css'),
      Script(src='static/slider.js'))


app = FastHTML(pico=False, hdrs=hdrs)
app.mount("/static", StaticFiles(directory="static"), name="static")

def kolom():
    respond = Div(
        Div(cls="column"),
        Div(
            #Main kolom
            Div(
                #Kolom untuk Alpha & .....
                Div(
                    Div(
                        #Kolom untuk slider dan Kotak Warna
                        Div(
                            #Kolom untuk Slider
                            Div(
                                Div("Ini RED",cls="column is-narrow"),
                                Div("Ini HUE",cls="column is-narrow"),
                                cls="columns is-mobile"),
                            cls="column is-narrow"),
                        Div("Ini Kotak Warna", cls="column is-narrow"),
                        cls="columns is-mobile"),    
                    cls="column is-narrow"),
                Div("Ini yang Lain lagi", cls="column is-narrow"),
                cls="columns"),
            cls="column is-narrow"),
        Div(cls="column"),
        cls="columns")
        
    return respond

@app.get("/")
def index():
    return H1("Judul-judulan",cls="title"), kolom()

serve()
