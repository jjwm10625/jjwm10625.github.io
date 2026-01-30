import * as S from './Hilingual.styles'
import infoImage from '../../assets/images/hilingual_project_info.png'

const HilingualOverview = () => {
  return (
    <section style={S.section}>
      <div style={S.content}>
        <h2 style={S.title}>Service Overview</h2>

        <p style={S.text}>
          하이링구얼의 주요기능을 소개합니다.
        </p>

        <img src={infoImage} style={S.image} />
      </div>
    </section>
  )
}

export default HilingualOverview
