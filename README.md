# GS de Cloud Solution

Nesse projeto vamos criar um site que se integra com uma API de cadastro de ocorrencias de desastres naturais
Nesse projeto, vamos exercitar os contextos de VPC, Subnets, ACLs, Route Tables, Security Groups, Internet Gateway e EC2

# AWS 

* Entre no AWS academy e crie um ambiente sandbox para você trabalhar (pode usar o learner lab se preferir)
* Após acessar o console da AWS, siga os passos para a implantação do nosso serviço

  
# Crie a sua infra 

1 - Crie a sua VPC de forma customizada
2 - Crie a sua subnet e configure para que a mesma seja publica e livre acesso a internet
3 - Crie uma instancia do EC2 dentro da sua subnet (use o linux padrao da aws), para que possamos executar o nosso deploy, precisamos instalar uma serie de pacotes quando fizermos a criacao do nosso EC2.
insira o codigo bash que segue na feature responsável por executar o comando automaticamente ao criar o EC2:

```

#!/bin/bash

# Atualizar pacotes
sudo yum update -y

# Instalar Node.js via NVM
export NVM_DIR="$HOME/.nvm"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Carrega o NVM
nvm install 18
node -v > /tmp/node_version.log  # Salva versão para verificação

# Instalar Git
sudo yum install git -y

# Configurar PATH permanente
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc
echo 'export PATH="$NVM_DIR/versions/node/v18*/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Verificações finais (opcional)
git --version >> /tmp/install_log.log
npm --version >> /tmp/install_log.log

```

4 - Configure o security group do EC2 para que permita o acesso de requisicoes HTTP de IPs da internet a porta 3000

Dica: certifique-se que todas as configuracoes de Subnets, ACLs, Route Tables, Security Groups e Internet Gateway estao configuradas corretamente para permitir o trafego de IPs da internet

# Deploy da nossa API

1 - Dentro do console da AWS temos a opcao de nos conectarmos a nossa maquina EC2, conecte-se e execute os seguinte comandos: 

2 - Após a instalação dos nossos pacotes vamos fazer o deploy da nossa app

```

git clone https://github.com/fabioBaraDev/aws-gs-1.git
cd aws-gs-1
npm install

sudo npm install pm2 -g
pm2 start app.js --name "meu-app-express"
pm2 save
pm2 startup

```

## Integrando a nossa API

1 - Baixe na usa maquina local o arquivo HTML chamado my_page.html que está nesse git

2 - Altere a variavel API_BASE_URL (que esta dentro de um javascript na pagina html), substitua `localhost` pelo o acesso a sua maquina EC2 

3 - Crie um bucket no S3 e faça o upload da pagina html alterada

3.1 - Para que o site funcione apropriadamente, precisamos resolver o problema de CORS, logo, configure:

3.1.1 - No bucket criado, acesse a aba "Permissions", vá em "Bucket policy" clique em "Edit" e cole o seguinte script (nao se esqueca de substituir o ARN) :

 ```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowPublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::testedobara/my_page.html"
        }
    ]
}
```

Na mesma aba vá em "Cross-origin resource sharing (CORS)" edite e cole:

```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

3.1.2 - Vá a aba "Properties" e desça até "Static website hosting"
 * em Static website hosting mude para enable
 * em index document cole "my_page.html"
 * Após salvar, em "Properties" e desça até "Static website hosting" lá estará a ulr do seu site


4 - Acesse o site estático criado no S3 e teste a integracao entre a pagina estatica e sua API no seu EC2