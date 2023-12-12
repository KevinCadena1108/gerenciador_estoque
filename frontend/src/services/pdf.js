import jsPDF from "jspdf";

function generatePDF(data) {
  const doc = new jsPDF();

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  let linhas = 1;

  doc.text(`RELATÓRIO MENSAL DE PEDIDOS`, 10, 10 + linhas * 8);
  linhas++;

  data.map((pedido) => {
    if (linhas >= 25) {
      doc.addPage();
      linhas = 1;
    }

    doc.text(
      `-----------------------------------------------------------------------------------------------`,
      10,
      15 + linhas * 8
    );
    linhas += 2;
    doc.text(`CODIGO PEDIDO: ${pedido.codp}`, 10, 10 + linhas * 8);
    linhas++;
    doc.text(`STATUS: ${pedido.estado}`, 10, 10 + linhas * 8);
    linhas++;
    doc.text(
      `DATA DO PAGAMENTO: ${new Date(pedido.data).toLocaleDateString("pt-BR")}`,
      10,
      10 + linhas * 8
    );
    linhas++;
    doc.text(`CLIENTE: ${pedido.cliente}`, 10, 10 + linhas * 8);
    linhas++;
    doc.text(`VENDEDOR: ${pedido.vendedor}`, 10, 10 + linhas * 8);
    linhas++;

    doc.text(`____ PRODUTOS ____`, 10, 10 + linhas * 8);
    linhas++;
    pedido.carrinho.map((item) => {
      doc.text(
        `${item.produto} - ${item.quantidade} unidades - Preço individual R$ ${
          item.preco
        } - Preço item: R$ ${item.preco * item.quantidade}`,
        10,
        10 + linhas * 8
      );
      linhas++;
    });
    doc.text(`TOTAL: R$ ${pedido.total}`, 10, 12 + linhas * 8);
    linhas++;
  });

  doc.save("relatorio.pdf");
}

export default generatePDF;
