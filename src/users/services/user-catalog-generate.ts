export class UserCatalogGenerate {
  public static gen() {
    let csv =
      'CODIGO_PRODUTO;NOME_PRODUTO;QUANTIDADE_EM_ESTOQUE;VALOR_NORMAL;VALOR_DESCONTO';

    for (let i = 0; i < 25000; i++) {
      csv += `\n${i};TINTA LATEX 16 LTS CORAL BASE 0A02B0${i};10;400.00;379.90`;
      console.log(`Gerando Produtos: TINTA LATEX 16 LTS CORAL BASE 0A02B0${i}`);
    }

    return csv;
  }
}
