import { Configuration, OpenAIApi } from 'openai';
import { EngineResponse } from '../../domain/EngineResponse';
import { CATEGORY } from '../../domain/Category';

export class ChatCompletionService {
  private openAiApi: OpenAIApi;
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);
  }

  public async getNeedsCompletion(inputText: string, localityName: string): Promise<EngineResponse> {
    const chatCompletion = await this.openAiApi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Eres un asistente que n base a un texto original escrito por una persona y una localidad,\
                    me resumas e infieras diversos campos de texto. Tú tienes que rellenar con información nueva según lo \
                    que yo ponga entre corchetes, [esto es un ejemplo]. Manda un solo bloque de código formato JSON con lo que \
                    generes. El bloque de código es el siguiente:\
                    {'category': '[La categoría que infieras según el texto  y su valor debe salir de la lista de posibles categorías que son: ${Object.values(
                      CATEGORY
                    )}. En caso de que no se relacione con ninguna de estas me pondrás el valor Otros]',\
                    'title': '[Dale un título al texto del usuario. Que resuma lo que dice en algo corto y genérico]',\
                    'description': '[Dime de qué está hablando el usuario y sobre qué trata el texto. Mantenlo breve]',\
                    'zip_code':  '[Código postal aleatorio que pertenezca a la localidad entrante]',\
                    'province': '[Provincia española dónde se encuentra la localidad entrante]',\
                    'estimated_population': [Población estimada de la localidad entrante]}`
        },
        {
          role: 'user',
          content:
            "Ejemplo de texto de entrada de ejemplo es el siguiente entre comillas: 'Más de una hora parados en la estación de Cornellà de Llobregat si. Que se haya habilitado un bus substitutivo y sin saber qué pasa! Que mal el servicio!!!!!Las historias infinitas de renfe @Renfe línea R4' y una localidad entre comillas: 'Cornella de Llobregat'"
        },
        {
          role: 'assistant',
          content:
            "{'category': 'Movilidad','title': 'Problemas en el servicio de transporte público','description': 'El usuario expresa su insatisfacción con el servicio de transporte público en la estación de Cornellà de Llobregat, específicamente en la línea R4 de Renfe. El usuario reporta haber esperado más de una hora en la estación, sin recibir información clara sobre lo que estaba ocurriendo y con un servicio de bus substitutivo que no resultó efectivo. Se infiere que existe una falla en la movilidad en la zona y se puede relacionar con el campo de infraestructura y servicios.','zip_code': '08940','province': 'Barcelona', 'estimated_population': 89039}"
        },
        {
          role: 'user',
          content: `Genérame un bloque de código para el texto de entrada siguiente entre comillas: '${inputText}' y la localidad siguiente entre comillas: '${localityName}'`
        }
      ],
      temperature: 0.7,
      top_p: 1,
      n: 1,
      max_tokens: 256
    });

    console.log(`Chat completed with ${chatCompletion.data.usage.total_tokens} total tokens used`);

    return JSON.parse(chatCompletion.data.choices[0].message.content) as EngineResponse;
  }
}
