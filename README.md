# 04Counter with RxJs

Toda la lógica de la aplicación reside en el servicio `services/counter.service.ts`.

En el susodicho archivo, disponemos de tres (Behavior)Subjects principales. Por orden de aparición:
- `counter$` es la propiedad pública a la que se suscriben el `app/counter/counter.component.ts` y el `app/config-view/config-view.component.ts`
- `interval$` es el encargado de emitir nuevos valores cada cierto tiempo, especificado en `_configuration` con la propiedad `speed`. Ciñiéndonos a la demo del proyecto, actualmente no hay manera de que el usuario pueda cambiar esto, pero en el futuro sería tan sencillo como modificar esta configuración al igual que modificamos `initialValue` y `steps`. Algunos apuntes itnteresantes al respecto:
  - Pasa por un pipe que contiene dos operadores: `takeWhile`, que emitirá una notificación de *complete* cuando la propiedad `count` de `_configuration` sea `false`. El segundo operador es un `tap`, en este caso encargado de pasarle un nuevo `next` a `_counter` sin modificar el flujo de datos original.
  - Este segundo operador contiene una lógica interna para que, atendiendo al valor de `countUp`, le pase a `_counter` un valor de resta o de suma.
- `_configuration` es donde reside la lógica con base en la cual se ejecutará la aplicación.

En cuanto a los métodos, he procurado que los nombres sean lo suficientemente descriptivos; y todos tienen como fin pasarles nuevos `next` a sus respectivos Subjects. Todos se deben llamar desde los componentes que tengan que interactuar con el servicio.

## Otros puntos interesantes
- Para la configuración de `initialValue` y `steps` hay un componente que hace uso de la clase `FormBuilder`. No he considerado necesario implementar validaciones.
- Tanto la configuración (`_configuration`) como el valor del formulario reactivo cuentan con sus respectivas interfaces, cada una en un archivo; y dentro de la carpeta `app/interfaces`.

## Posibles mejoras
- Dado que la finalidad del ejercicio era experimentar con los operadores de RxJs, me he ceñido a estos para implementar todas las funcionalidades. No obstante, considero que para un caso práctico real habría maneras más sencillas de conseguir el mismo resultado. Eso sí, siempre con el uso de Subjects (♥).
- En consonancia con el punto anterior, tampoco termina de convencerme la idea de almacenar objetos tan "complejos" como el de configuración dentro del mismo Subject. Potencialmente, esto podría causar renderizados inesperados; además de haber hecho la experiencia de desarrollo un poco menos amena. Considero que habría sido más práctico y menos arriesgado almacenar cada propiedad en su respectivo Subject; y después haber sacado la visualización de la información (`app/config-view/config-view.component.ts`) de esta configuración con un `concatMap`.