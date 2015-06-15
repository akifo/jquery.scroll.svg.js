# svg scroll


[Live demo](http://akifo.github.io/jquery.scroll.svg.js/)

## usage
I'm sorry in Japanses.
When I feel like it, I write in English.

htmlの書き方。

```html
<object id="test" data="test.svg" type="image/svg+xml"></object>
```

- 必ずidをつけること。

svgファイルを object で呼び出す。
対応している svgの形式は path で書かれたもののみ。
イラレとかで書いたら path で出力できるし、それだけで良いかなと。

javascriptの書き方

```javascript
$('#test').ScrollSvg({
	stroke: '#3498db',
});
```

- 必ずidで呼び出す。
- なので、必然的にobjectひとつずつに対して、上記コードが必要。

## options

Option | Type | Default | Description
------ | ---- | ------- | -----------
startSlack | int | 100 | svgイメージが画面に表示されて何ピクセルで表示しはじめさせるかの数値。
fill | string | none | 塗りつぶしの色
stroke | string | #930 | 線の色
strokeWidth | string | 3 | 線の幅
transitionProperty | string | all | css設定
transitionDuration | string | 5s | css設定
transitionTimingFunction | string | ease | css設定
transitionDelay |  string | 0s | css設定


