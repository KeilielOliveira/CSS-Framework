# Documentação de @mixins
Aqui se encontra uma resumo sobre a estrutura ds mixins e como usa-los. A documentação estará categorizada na seguinte ordem.

1. **Nome do arquivo**
2. **Nome do @mixin**

## _variables.mixin.scss

### @mixin make-css-variables()
Esse mixin cria variaveis css a partir de mapas sass, sua estrutura é simples e possui apenas dois parametros.

**Exemplo:**
```scss
@use 'mixins/variables.mixin' as mixin;

//Mapa de variaveis a serem geradas.
$map: (
    'size-1': 16px,
    'size-2': 22px
);

:root {
    @include mixin.make-css-variables($map, 'text');
}
```

O exemplo acima gerara duas variaveis de nomes ( **--text-size-1** e **--text-size-2** ) contendo cada uma seu respectivo valor.

#### Parametros

**(map) $variables-map**: O mapa sass contendo as variaveis a serem geradas. O mapa deve seguir o formato ( **nome da variavel**: **valor da variavel** ).
**Exemplo:**
```scss
//Exemplo de um mapa de variaveis valido.
$variables-map: (
    'color-red': red,
    'color-blue': blue,
    'color-green': green
);
```

**(string) $variable-name-prefix**: Um prefixo que será adicionado ao inicio do nome de todas as variaveis. Ele não é obrigatorio, mas é util para unir variaveis.
**Exemplo:**
```scss
@use 'mixins/variables.mixin' as mixin;

//Exemplo de um mapa de variaveis valido.
$variables-map: (
    'color-red': red,
    'color-blue': blue,
    'color-green': green
);

//Exemplo de um prefixo de nome de variaveis.
$variable-name-prefix: 'background';

:root {
    @include mixin.make-css-variables($variables-map, $variable-name-prefix);
}
```
O exemplo acima produzira classes com nomes unificados pelo prefixo **background** permitindo entender rapidamente que se trata de variaveis de cores para a propriedade **background-color**.