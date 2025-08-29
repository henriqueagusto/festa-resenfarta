        // Preloader
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.getElementById('preloader').classList.add('hidden');
            }, 2000);
        });

        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

      
        // Particles animation
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 10 + 's';
                particle.style.animationDuration = (10 + Math.random() * 10) + 's';
                
                // Random neon colors
                const colors = ['var(--neon-pink)', 'var(--neon-blue)', 'var(--neon-yellow)', 'var(--neon-purple)'];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                // Random size
                const size = Math.random() * 4 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                particlesContainer.appendChild(particle);
            }
        }
        createParticles();

        // Countdown timer
        function updateCountdown() {
            const eventDate = new Date('2024-08-30T20:30:00').getTime();
            const now = new Date().getTime();
            const distance = eventDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

            if (distance < 0) {
                document.querySelector('.countdown').innerHTML = '<h2 style="color: var(--neon-pink); font-size: 3rem;">A FESTA JÁ COMEÇOU! 🔥</h2>';
            }
        }
        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // FAQ Toggle
        function toggleFAQ(element) {
            const faqItem = element.parentElement;
            const allItems = document.querySelectorAll('.faq-item');
            
            // Close all other items
            allItems.forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current item
            faqItem.classList.toggle('active');
        }

  

// Variável global para tipo de ingresso
let tipoIngressoSelecionado = '';

// ========== FUNÇÕES DO MODAL ==========
function selectTicket(type) {
    const modal = document.getElementById('ticketModal');
    const modalTitle = document.getElementById('modalTitle');
    const selectIngresso = document.getElementById('tipoIngresso');
    
    // Verificar se os elementos existem
    if (!modal || !modalTitle || !selectIngresso) {
        console.error('Elementos do modal não encontrados!');
        return;
    }
    
    tipoIngressoSelecionado = type;
    
    let title = '';
    switch(type) {
        case 'masculino':
            title = 'Ingresso Individual Masculino - R$ 40,00';
            selectIngresso.value = 'masculino';
            break;
        case 'feminino':
            title = 'Ingresso Individual Feminino - R$ 30,00';
            selectIngresso.value = 'feminino';
            break;
        case 'combo':
            title = 'Combo Grupos - A partir de R$ 110,00';
            selectIngresso.value = 'combo';
            break;
        default:
            title = 'Comprar Ingresso';
            break;
    }
    
    modalTitle.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('Modal aberto para:', type);
}

function closeModal() {
    const modal = document.getElementById('ticketModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        console.log('Modal fechado');
    }
}

// ========== FUNÇÃO WHATSAPP ==========
function enviarWhatsApp(dados) {
    try {
        const telefone = "5561999682723"; // Seu número do WhatsApp
        
        // Formatação da mensagem
        const mensagem = `🎫 *NOVA COMPRA DE INGRESSO!*

👤 *Nome:* ${dados.nome}
📧 *Email:* ${dados.email}
🆔 *CPF:* ${dados.cpf}
🎟️ *Ingresso:* ${dados.ingresso}
⏰ *Data:* ${new Date().toLocaleString('pt-BR')}

---
_Sistema Automático de Vendas_`;

        // Criar URL do WhatsApp
        const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
        
        console.log('Abrindo WhatsApp com URL:', url);
        
        // Abrir WhatsApp em nova aba
        const newWindow = window.open(url, '_blank');
        
        // Verificar se conseguiu abrir
        if (newWindow) {
            console.log('WhatsApp aberto com sucesso!');
            return true;
        } else {
            console.error('Bloqueador de popup impediu abertura');
            // Fallback: tentar com window.location
            window.location.href = url;
            return true;
        }
        
    } catch (error) {
        console.error('Erro ao abrir WhatsApp:', error);
        return false;
    }
}

// ========== VALIDAÇÃO DE CAMPOS ==========
function validarCampos(dados) {
    // Verificar campos obrigatórios
    if (!dados.nome || dados.nome.trim() === '') {
        alert('❌ Por favor, preencha o nome completo!');
        document.getElementById('nome').focus();
        return false;
    }
    
    if (!dados.email || dados.email.trim() === '') {
        alert('❌ Por favor, preencha o e-mail!');
        document.getElementById('email').focus();
        return false;
    }
    
    if (!dados.cpf || dados.cpf.trim() === '') {
        alert('❌ Por favor, preencha o CPF!');
        document.getElementById('cpf').focus();
        return false;
    }
    
    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dados.email)) {
        alert('❌ Por favor, digite um e-mail válido!');
        document.getElementById('email').focus();
        return false;
    }
    
    // Validação básica de CPF (apenas números)
    const cpfNumeros = dados.cpf.replace(/\D/g, '');
    if (cpfNumeros.length !== 11) {
        alert('❌ CPF deve ter 11 dígitos!');
        document.getElementById('cpf').focus();
        return false;
    }
    
    return true;
}

// ========== FORMATAÇÃO DE CPF ==========
function formatarCPF(valor) {
    // Remove tudo que não é dígito
    valor = valor.replace(/\D/g, '');
    
    // Aplica a máscara
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    return valor;
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de ingressos carregado!');
    
    // Verificar se elementos existem
    const form = document.getElementById('ticketForm');
    const modal = document.getElementById('ticketModal');
    
    if (!form) {
        console.error('Formulário não encontrado!');
        return;
    }
    
    if (!modal) {
        console.error('Modal não encontrado!');
        return;
    }
    
    // ========== FORMATAÇÃO AUTOMÁTICA DO CPF ==========
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            e.target.value = formatarCPF(e.target.value);
        });
    }
    
    // ========== FECHAR MODAL CLICANDO FORA ==========
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ========== SUBMIT DO FORMULÁRIO ==========
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Formulário enviado!');
        
        // Capturar dados
        const dados = {
            nome: document.getElementById('nome')?.value || '',
            email: document.getElementById('email')?.value || '',
            cpf: document.getElementById('cpf')?.value || '',
            ingresso: document.getElementById('tipoIngresso')?.selectedOptions[0]?.text || 'Não selecionado'
        };
        
        console.log('Dados capturados:', dados);
        
        // Validar campos
        if (!validarCampos(dados)) {
            return;
        }
        
        // Elementos do botão
        const botao = document.getElementById('btnFinalizar');
        if (!botao) {
            console.error('Botão não encontrado!');
            return;
        }
        
        const textoOriginal = botao.textContent;
        
        // Alterar estado do botão
        botao.textContent = '📱 Abrindo WhatsApp...';
        botao.disabled = true;
        botao.style.opacity = '0.7';
        
        try {
            // Tentar enviar para WhatsApp
            console.log('Tentando abrir WhatsApp...');
            const sucesso = enviarWhatsApp(dados);
            
            if (sucesso) {
                // Feedback de sucesso
                setTimeout(() => {
                    alert('✅ WhatsApp aberto com sucesso!\n\n📱 Envie a mensagem para finalizar sua compra.\n\n🎫 Em breve entraremos em contato!');
                    
                    // Limpar formulário
                    form.reset();
                    
                    // Fechar modal
                    closeModal();
                    
                }, 800);
                
            } else {
                throw new Error('Falha ao abrir WhatsApp');
            }
            
        } catch (error) {
            console.error('Erro no processo:', error);
            alert('❌ Erro ao abrir WhatsApp.\n\n📞 Entre em contato pelo telefone:\n+55 61 99942-5069');
        } finally {
            // Restaurar botão
            setTimeout(() => {
                botao.textContent = textoOriginal;
                botao.disabled = false;
                botao.style.opacity = '1';
            }, 2000);
        }
    });
    
    console.log('Event listeners configurados com sucesso!');
});
        // Copy PIX key
        function copyPix() {
            const pixKey = document.getElementById('pixKey').textContent;
            navigator.clipboard.writeText(pixKey).then(function() {
                alert('Chave PIX copiada com sucesso! 📋\n\nCole no seu app bancário para fazer o pagamento.');
            }, function() {
                alert('Erro ao copiar. Por favor, selecione e copie manualmente.');
            });
        }

        // Send proof via WhatsApp
        function sendProof() {
            const message = 'Olá! Acabei de fazer o pagamento do ingresso RESENFARTA 2024. Segue o comprovante:';
            const whatsappUrl = `https://wa.me/5561981554977?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }

        // Form submission
        document.getElementById('ticketForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Ingresso reservado com sucesso! Envie o comprovante PIX para confirmar sua compra.');
            closeModal();
        });

      

        // Gallery item click
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                // In a real implementation, this would open a lightbox
                alert('Galeria interativa em breve!');
            });
        });

        // Scroll animations
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.info-card, .dj-card, .ticket-card, .gallery-item, .faq-item, .section-title, .countdown-item');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        // Initial style for scroll animations
        document.querySelectorAll('.info-card, .dj-card, .ticket-card, .gallery-item, .faq-item').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
        });

        document.querySelectorAll('.section-title, .countdown-item').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease 0.2s';
        });

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll();

        // Dynamic gradient animation for hero title
        let hue = 0;
        setInterval(() => {
            hue = (hue + 0.5) % 360;
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                heroTitle.style.filter = `hue-rotate(${hue}deg)`;
            }
        }, 50);// Countdown timer
function updateCountdown() {
    const eventDate = new Date('2025-08-30T22:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        document.getElementById('countdown').innerHTML = '<h2 class="festa-comecou">A FESTA JÁ COMEÇOU! 🔥</h2>';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();