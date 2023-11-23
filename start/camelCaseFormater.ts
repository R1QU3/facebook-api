import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { SnakeCaseNamingStrategy } from '@ioc:Adonis/Lucid/Orm'
import { string } from '@ioc:Adonis/Core/Helpers'

class CamelCaseNamingStrategy extends SnakeCaseNamingStrategy {
  public serializedName (_model: typeof BaseModel, attributeName: string): string {
    return string.camelCase(attributeName)
  }
}

BaseModel.namingStrategy = new CamelCaseNamingStrategy()
