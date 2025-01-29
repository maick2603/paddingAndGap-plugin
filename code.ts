// Função principal do plugin
figma.showUI(__html__, { width: 850, height: 680 });

// Obtém os componentes da página atual
const components = figma.root.findAll(node => node.type === "COMPONENT") as ComponentNode[];
console.log(components);

// Array para armazenar as informações dos componentes
let componentData: any[] = [];

// Função para calcular o padding de um componente
function getPadding(component: ComponentNode) {
    return `${component.paddingTop},${component.paddingRight},${component.paddingBottom},${component.paddingLeft}`; // Padding individual
}

// Função para calcular o gap entre os filhos de um componente
function getGap(component: ComponentNode) {
  //if (component.children.length > 1) {
    return component.itemSpacing; // Gap
  //}
  //return 0; // Sem gap se não houver filhos suficientes
} 

// Itera sobre os componentes da página
components.forEach(component => {
  const name = component.parent && component.parent.type === 'COMPONENT_SET' ? `${component.parent.name} (${component.name})` : component.name;
  const padding = getPadding(component);
  const gap = getGap(component);
  // Adiciona as informações do componente ao array
  componentData.push({
    name: name,
    paddingtop: padding.split(',')[0],
    paddingright: padding.split(',')[1],
    paddingbottom: padding.split(',')[2],
    paddingleft: padding.split(',')[3],
    gap: gap
  });
});

// Envia os dados para a UI
figma.ui.postMessage({ type: 'componentData', data: componentData });

// Aguarda mensagens da UI (se necessário)
figma.ui.onmessage = msg => {
  if (msg.type === 'close') {
    figma.closePlugin();
  }
};