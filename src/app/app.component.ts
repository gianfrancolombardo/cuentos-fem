import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form_auto!: FormGroup;
  result: any = null;

  constructor(private _builder: FormBuilder, private _api: ApiService){}

  ngOnInit() {
    this.form_auto = this._builder.group({
      seed: ['', Validators.required]
    });
  }

  generate_auto(){
    if (this.form_auto.valid){
      let seed = this.form_auto.value.seed;
      let prompt = `
      Genera un cuento corto (maximo 200 caracteres) para niños que enseñe uno de los siguientes principios del feminismo: igualdad de género, empoderamiento femenino, derecho a la autodeterminación, eliminación de la violencia machista, la familia y el patriarcado, la lucha contra la opresión, solidaridad, la historia del feminismo o la importancia de la educación.
      Usa la semilla '${seed}' para crear la historia. Asegúrate de que la historia transmita uno de los valores mencionados anteriormente, de una manera accesible y fácil de entender para los niños.
      Agregale un titulo corto al inicio.
      Elige 2 momentos destacados del cuento y crea 2 prompts para un generador de imagen con el prefijo 'Image:' y colócalos en medio de cuento, al final de su correspondiente párrafo
      Devuélvelo en formato Markdown.
                  `;

      console.log(prompt);
      this.result = `# Las aventuras de la Princesa Nena

      Llegaron los inviernos más fríos y la Princesa Nena se preparaba para su aventura. Esta vez, era una aventura diferente. Esta vez, era una aventura para luchar contra la opresión.
      
      Nena conoció a una líder llamada Rosa, que le enseñó sobre la importancia de la igualdad de género, el empoderamiento femenino, el derecho a la autodeterminación y la eliminación de la violencia machista.
      
      Image: Princesa Nena junto a Rosa, la líder
      
      Rosa llevó a Nena a la ladera de la montaña para enseñarle sobre la familia y el patriarcado. Allí, Nena aprendió que la solidaridad entre las mujeres es la clave para la lucha contra la opresión.
      
      Image: Princesa Nena y Rosa en la ladera de la montaña
      
      Juntas, Nena y Rosa descubrieron la historia del feminismo. Aprendieron que la educación es la herramienta más poderosa para lograr la igualdad y el empoderamiento de las mujeres.
      
      Al final de la aventura, Nena regresó a su castillo con una nueva perspectiva. La princesa Nena había descubierto los principios del feminismo.`
      return;
      this._api.completePrompt(prompt).subscribe({
        next: (res) => {
          console.log(res);
          let data = res.choices[0].text;
          this.result = data;
        },
        error: (error) => {
          console.error('Ha ocurrido un error: ', error);
        },
        complete: () => {
          console.log('Completo');
        }
      })
    }
  }
}
