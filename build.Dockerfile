#This Dockerfile builds the project and creates a container image

#Image that builds the projet and passes the build to the main image
FROM ubuntu:focal AS buildtask

ARG TARGETPLATFORM

RUN apt-get update \
  && apt-get install -y wget curl ca-certificates gnupg

#Install dotnet
RUN wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb \
  && dpkg -i packages-microsoft-prod.deb \
  && rm packages-microsoft-prod.deb \
  && apt-get update \
  && apt-get install -y dotnet-sdk-7.0

#Install nodejs
RUN mkdir -p /etc/apt/keyrings \
  && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
  | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
  && NODE_MAJOR=18 \
  && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" \
     > /etc/apt/sources.list.d/nodesource.list \
  && apt-get update \
  && apt-get install -y nodejs

#Install Swashbuckle.AspNetCore.Cli
RUN dotnet tool install -g --version 6.4.0 Swashbuckle.AspNetCore.Cli

#Copy and build the project in the container
COPY . /

RUN ./build.sh linux-x64

RUN mkdir /files
RUN cp _output/*.tar.gz /files/
RUN cp -r UI/Web/dist /files/wwwroot
RUN /copy_runtime.sh
RUN chmod +x /Kavita/Kavita

#Production image
FROM ubuntu:focal

COPY --from=buildtask /Kavita /kavita
COPY --from=buildtask /files/wwwroot /kavita/wwwroot
COPY API/config/appsettings.json /tmp/config/appsettings.json

#Installs program dependencies
RUN apt-get update \
  && apt-get install -y libicu-dev libssl1.1 libgdiplus curl \
  && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 5000

WORKDIR /kavita

HEALTHCHECK --interval=30s --timeout=15s --start-period=30s --retries=3 CMD curl --fail http://localhost:5000/api/health || exit 1

ENV DOTNET_RUNNING_IN_CONTAINER=true

ENTRYPOINT [ "/bin/bash" ]
CMD ["/entrypoint.sh"]
