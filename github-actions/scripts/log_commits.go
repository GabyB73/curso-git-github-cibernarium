package main

import (
  "fmt"
  "os"
  "os/exec"
  "path/filepath"
  "time"
  )

func main (){
  cmd := exec.Command("git", "log", "-n", "3", "--pretty=format:%h -%an, %ar :%s")
  out, err := cmd.output()
  if err != nil{
    fmt.Printf("Error ejecutando git log %v\n", err)
    os.Exit(1)
    }
  
  //Creación de la carpeta log
  logDiv := filepath.Join("..", "log")
  if _, err := os.Stat(logDiv); os.IsNotExist(err){
    //Definimos permisos de escritura
    err = os.Mkdir(logDir, 0755)
    if err != nil{
      fmt.Printf("Error creando directorio %s: %v\n", logDir, err);
      os.Exit(1)
      }
    }

  //Generar nombre del archivo
  currentTime := time.Now().Format("2006-01-02_15-04-05") //Máscara de YYYY-mm-dd HH-ii-ss
  logFile := filepath.Join(logDir, fmt.Sprintf("Commits_%s.txt", currentTime))

  //Escribir el archivo
  contenido := fmt.Sprintf("Se han escrito los últimos 3 commits del repositorio:\n%s", string(out))
  if err != nil {
    fmt.Printf("Se ha producido un error creando en %s %v\n", logFile, err)
    os.Exit(1)
    }

  fmt.Printf("Se ha creado el archivo de log en %s\n", logFile)
  }
  
  
  
  
  
