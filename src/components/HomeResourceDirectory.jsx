import { articleCopy } from '../seo/articles.js'
import { routePath } from '../seo/routes.js'
import { seoToolCopy } from '../seo/toolContent.js'

const guideKeys = Object.freeze([
  'copy',
  'notWorking',
  'makeDot',
  'makeCircle',
  'movementError',
  'firingError',
  'movementVsFiring',
  'staticVsDynamic',
  'dotVsCross',
  'placement',
])

const toolKeys = Object.freeze(['generator', 'decoder', 'preview', 'comparison'])

const directoryCopy = {
  en: {
    eyebrow: 'GUIDES + TOOLS',
    title: 'Fix it, learn it, or build your own',
    intro: 'Jump straight to the answer you need, or open a tool and test the result on a map.',
    guides: 'Crosshair guides',
    tools: 'Tools you can use now',
  },
  es: {
    eyebrow: 'GUÍAS + HERRAMIENTAS',
    title: 'Arréglalo, apréndelo o crea el tuyo',
    intro: 'Ve directo a la respuesta que buscas o abre una herramienta y prueba el resultado sobre un mapa.',
    guides: 'Guías de miras',
    tools: 'Herramientas listas para usar',
  },
  'pt-BR': {
    eyebrow: 'GUIAS + FERRAMENTAS',
    title: 'Resolva, aprenda ou crie a sua',
    intro: 'Vá direto para a resposta ou abra uma ferramenta e teste o resultado no mapa.',
    guides: 'Guias de mira',
    tools: 'Ferramentas prontas para usar',
  },
  'zh-CN': {
    eyebrow: '准星不只靠抄代码',
    title: '看教程，或者直接用工具解决',
    intro: '代码报错、想练预瞄，还是想自己捏一个准星，都可以从这里直接进去。',
    guides: '先看教程',
    tools: '直接上手',
  },
}

export default function HomeResourceDirectory({ locale }) {
  const copy = directoryCopy[locale] || directoryCopy.en

  return (
    <section className="home-resource-directory" id="guides-and-tools" aria-labelledby="home-resource-title">
      <header>
        <span>{copy.eyebrow}</span>
        <h2 id="home-resource-title">{copy.title}</h2>
        <p>{copy.intro}</p>
      </header>
      <div className="home-resource-columns">
        <nav aria-label={copy.guides} id="guides">
          <h3>{copy.guides}</h3>
          <div>
            {guideKeys.map((articleKey) => (
              <a href={routePath(locale, { type: 'article', articleKey })} key={articleKey}>
                {articleCopy(locale, articleKey).title}
              </a>
            ))}
          </div>
        </nav>
        <nav aria-label={copy.tools} id="tools">
          <h3>{copy.tools}</h3>
          <div>
            {toolKeys.map((toolKey) => (
              <a href={routePath(locale, { type: 'tool', toolKey })} key={toolKey}>
                {seoToolCopy(locale, toolKey).title}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </section>
  )
}
