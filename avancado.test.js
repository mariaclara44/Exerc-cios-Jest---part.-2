const {
    ehPalindromo,
    contarVogais,
    calcularFatorial,
    removerDuplicatas,
    agendarConsulta,
    formatarMoeda,
    validarCpfBasico,
    calcularIngresso,
    ContaBancaria,
    obterClima,
} = require('./avancado');

describe('Suíte de Testes Unitários Avançados - Parte 2', () => {
    test('1. ehPalindromo', () => {
        expect(ehPalindromo('radar')).toBe(true);
        expect(ehPalindromo('Arara')).toBe(true);
        expect(ehPalindromo('javascript')).toBe(false);
        expect(ehPalindromo('')).toBe(false);
    });

    test('2. contarVogais', () => {
        expect(contarVogais('computador')).toBe(4);
        expect(contarVogais('programação')).toBe(5);
        expect(contarVogais('xyz')).toBe(0);
    });

    test('3. calcularFatorial', () => {
        expect(calcularFatorial(5)).toBe(120);
        expect(calcularFatorial(0)).toBe(1);
        expect(calcularFatorial(1)).toBe(1);
        expect(() => calcularFatorial(-5)).toThrow('Não existe fatorial de número negativo');
    });

    test('4. removerDuplicatas', () => {
        expect(removerDuplicatas([1, 1, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
        expect(removerDuplicatas(['a', 'b', 'a'])).toEqual(['a', 'b']);
    });

    test('5. agendarConsulta', () => {
        const dataSegundaFeira = new Date(2026, 9, 26);
        const dataSabado = new Date(2026, 9, 24);
        const dataDomingo = new Date(2026, 9, 25);

        expect(agendarConsulta(dataSegundaFeira)).toBe('Consulta agendada com sucesso');

        expect(() => agendarConsulta(dataSabado)).toThrow('Clínica fechada aos finais de semana');

        expect(() => agendarConsulta(dataDomingo)).toThrow('Clínica fechada aos finais de semana');
    });

    test('6. formatarMoeda', () => {
        expect(formatarMoeda(100)).toBe('R$ 100,00');
        expect(formatarMoeda(15.5)).toBe('R$ 15,50');
        expect(() => formatarMoeda('abc')).toThrow('Valor inválido');
    });

    test('7. validarCpfBasico', () => {
        expect(validarCpfBasico('12345678901')).toBe(true);
        expect(validarCpfBasico('123.456.789-01')).toBe(true);
        expect(validarCpfBasico('11111111111')).toBe(false);
        expect(validarCpfBasico('12345')).toBe(false);
    });

    test('8. calcularIngresso', () => {
        expect(calcularIngresso(25, false, 1)).toBe(40);
        expect(calcularIngresso(20, true, 1)).toBe(20);
        expect(calcularIngresso(65, false, 1)).toBe(20);
        expect(calcularIngresso(25, false, 3)).toBe(20);
        expect(calcularIngresso(70, true, 3)).toBe(20);
    });

    describe('9. ContaBancaria', () => {
        let conta;

        beforeEach(() => {
            conta = new ContaBancaria('Felipe Mamprim');
        });

        test('deve iniciar com saldo zero', () => {
            expect(conta.obterSaldo()).toBe(0);
        });

        test('deve depositar valor positivo', () => {
            conta.depositar(150);
            expect(conta.obterSaldo()).toBe(150);
        });

        test('deve lançar erro ao depositar valor menor ou igual a zero', () => {
            expect(() => conta.depositar(-50)).toThrow('Valor de depósito deve ser positivo');
        });

        test('deve sacar com saldo suficiente', () => {
            conta.depositar(200);
            conta.sacar(80);
            expect(conta.obterSaldo()).toBe(120);
        });

        test('deve lançar erro ao sacar mais do que possui', () => {
            conta.depositar(50);
            expect(() => conta.sacar(100)).toThrow('Saldo insuficiente');
        });
    });

    describe('10. obterClima', () => {
        test('deve retornar a temperatura quando o serviço responder', async () => {
            const servicoMock = {
                buscar: jest.fn().mockResolvedValue({ temperatura: 28 }),
            };

            const resultado = await obterClima('São Paulo', servicoMock);

            expect(resultado).toBe('A temperatura em São Paulo é de 28°C');
            expect(servicoMock.buscar).toHaveBeenCalledWith('São Paulo');
            expect(servicoMock.buscar).toHaveBeenCalledTimes(1);
        });

        test('deve lançar erro quando o serviço falhar', async () => {
            const servicoMockComFalha = {
                buscar: jest.fn().mockRejectedValue(new Error('Network Offline')),
            };

            await expect(obterClima('Curitiba', servicoMockComFalha)).rejects.toThrow(
                'Falha ao buscar dados climáticos',
            );
        });
    });
});
