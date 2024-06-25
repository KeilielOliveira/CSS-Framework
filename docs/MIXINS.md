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

## _utilities.mixin.scss

### @mixin make-utilities-class()
Gera classes utilitarias com base em mapas passados.
**Exemplo:**
```scss
@use 'mixins/utilities.mixin' as utilities;

@include utilities.make-utilities-class((
    'display': (
        'property': display,
        'class': 'display',
        'values': block inline-block flex,
        'use-values': true,
        'responsive': true
    )
));
```
O exemplo acima irá gerar classes de display (.display-block, .display-inline-block, .display-flex), juntamente de suas versões responsivas.

#### Parametros
O mixin recebe um unico parametro que deve ser um mapa sass, esse mapa deve seguir uma sintaxe especifica como descrito a seguir.

**(map) reference**: O mapa aceito pelo mixin é composto por outros mapas que configuram individualmente esse utilitario, a chave de referencia desse mapa é irrelevante, por padrão se usa o nome da propriedade css da classe utilitaria.

**(css property) property**: Esse é um item de configuração individual, aqui deve ser passada a propriedade css da classe utilitaria, esse é um parametro obrigatorio.

**(string) class**: Base do nome da classe utilitaria, esse parametro servira basicamente como a base para montar o nome das classes css, ele não é obrigatorio, se omitido, a propriedade css será usada no lugar.

**(string, list, map) values**: Os valores usados para gerar as classes utilitarias, é um parametro obrigatorio e pode ser passado de 3 formas, a diferença entre cada uma é o nome final da classe, onde caso os valores sejam passados como um mapa, o nome da classe será definido da seguinte forma (**base do nome** + **chave do valor**), e caso sejá passado como string ou lista será (**base do nome** + (**indice do valor** ou **valor**)) neste caso o que defini se será usado o indice do valor ou o proprio valor é o parametro seguinte.

**(bool) use-values**: Defini se caso os valores da propriedade css forem passados como uma string ou lista, se os valores em si devem ser usados na composição do nome da classe utilitaria, sendo o padrão **false**.

**(bool) responsive**: Defini se devem ser geradas versões responsivas de cada cada classe para cada breakpoint, por padrão é **false**, os nomes das classes responsivas seguem o mesmo padrão, a unica diferença e que a base do nome agora e definida da seguinte forma (**base do nome** + **sufixo do responsivo**).

**Exemplo:**
```scss
@use 'mixins/utilities.mixin' as utilities;

@include utilities.make-utilities-class((
    'display': (
        'property': display,
        'class': 'display',
        'values': block inline-block,
        'use-values': true,
        'responsive': true
    ),
    'flex-direction': (
        'property': flex-direction,
        'class': 'flex',
        'values': (
            'row': row,
            'row-reverse': row-reverse,
            'col': column,
            'col-reverse': column-reverse
        ),
        'responsive': true
    )
));
```