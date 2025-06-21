import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface GonullulukModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function GonullulukModal({
  open,
  handleClose,
}: GonullulukModalProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="gonulluluk-dialog-title"
      aria-describedby="gonulluluk-dialog-description"
    >
      <DialogTitle id="gonulluluk-dialog-title">
        GÖNÜLLÜLÜK ESASLARI
      </DialogTitle>
      <DialogContent dividers>
        <Box id="gonulluluk-dialog-description" tabIndex={-1}>
          <Typography paragraph>
            Ahbap Derneği Gönüllülerinin; Ahbap Derneği'nin ("dernek" olarak
            anılacaktır) kuruluş ilkelerine, vizyonuna ve misyonuna uygun şekilde
            hareket ederek, gönüllük çalışmalarını gerçekleştirmek en temel
            amaçtır. Ahbap olarak, tüm canlılar arasında dayanışma, saygı ve
            yardımlaşma ilkesini benimsiyoruz ve herkesi bu düşünceyle
            karşılıyoruz.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            GÖNÜLLÜLÜK TAAHHÜTNAMESİ
          </Typography>
          <Typography paragraph>
            Yukarıda anılan amaçlar doğrultusunda Ahbap gönüllüsü olarak;
          </Typography>
          <List dense sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Derneğe uyumlu olarak vizyon ve misyonuna aykırı etmeyeceğimi," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Tüm canlıların ihtiyaçlarını herhangi bir ayrım gözetmeksizin karşılayarak, onlara yardımcı olmayı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Kişilerin dinine, diline, ırkına, yönelimlerine veya siyasi görüşlerine bakılmaksızın yardım etmeyi, onları anlamayı ve onlarla empati kurmayı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Kişileri ötekileştiren, ayrımcılığa yol açabilecek herhangi bir tartışmaya girmemeyi," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Ayika gönüllüsü olduğumu belirttiğim hiçbir fiziksel veya sosyal platformda (Facebook, Twitter vb.) siyasi içerikli, din, dil, ırk konusunda ayrıştırıcı veya ötekileştirici paylaşımlar yapmamayı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Şehir içinde faaliyetlere katıldığımda Ayika gönüllüleri de dahil olmak üzere farklı sivil toplum kuruluşlarındaki gönüllülerle din, dil, yönelim, siyaset konularında herhangi bir ayrıştırıcı tartışmaya girmeyeceğimi ve fiziksel ya da sözlü şiddete başvurmayacağımı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Ayika üyeleri, görevlileri ve diğer gönüllülerle uyum içinde çalışıp, ekip çalışmalarına destek vereceğimi," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Dernek tanıtım toplantılarına ve gönüllü eğitimlerine katılım sağlayacağımı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Gönüllü çalışmalarında süreklilik gösterip, zaman planlamasına uyacağımı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Gönüllü çalışmalarında Ayika Derneği tarafından belirlenen ilke ve kurallara uyacağımı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Ayika adını kullanarak kişisel çıkar sağlamayacağımı, hediye ve adıma bağış kabul etmeyeceğimi," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Ayika toplantılarına, organizasyonlara ve gönüllü seminerlerine katılacağımı, katılamayacağım durumlarda önceden bilgi vereceğimi," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Gönüllü Bilgi Forumu'nda verdiğim bilgilerin doğru, eksiksiz ve gerçeğe uygun olduğunu," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Türkiye Cumhuriyeti devleti aleyhinde faaliyette bulunmadığımı ve yüz kızartıcı bir suçtan ceza almadığımı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Kendime, gönüllülere ve ihtiyaç sahiplerine zarar verebilecek, bilinmesi, önlem alınması, izlenmesi gereken herhangi bir sağlık sorunum olmadığını ve olduğu takdirde derneğe bildirimde bulunacağımı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Ayika faaliyetlerinde etkin iletişim kurulabilmesi için kayıtlarda yer alan herhangi bir kişisel verimde değişiklik olması halinde en kısa sürede ilgili birime bildirimde bulunacağımı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Ayika Derneği bünyesindeki faaliyetler ile ilgili bilgilerin ve çeşitli duyuruların e-posta ile veya kısa mesaj (SMS) olarak tarafına ulaştırılmasını kabul ettiğimi," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Ayika Derneği gönüllülük faaliyetleri ve bunlara hazırlık esnasında, dernek ilke ve amaçlarına uygun olmak ve bu doğrultuda kullanılmak koşuluyla, çekilmiş olan fotoğraflarının kullanılması ve saklanmasına rıza gösterdiğimi," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Ayika Derneği bünyesindeki faaliyetler ile ilgili bilgilerin ve çeşitli duyuruların telefon, çağrı merkezleri, faks, akıllı ses kaydedici sistemler, elektronik posta, kısa mesaj gibi vasıtalar kullanılarak elektronik ortamda tarafına ulaştırılmasını önceden kabul ettiğimi ve bu konuda gerekli izni verdiğimi," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Dernek çalışanlarına, gönüllülerine ve ihtiyaç sahiplerine ilişkin kişisel veri, bilgi ya da görsellerin gizliliğine azami düzeyde riayet edeceğimi bu kişisel veri, bilgi ve görselleri (fotoğraf, video, ses vb.) üçüncü kişilerle, hizmet sağlayıcıları ile yetkili kurum ve kuruluşlarla ve sosyal medya vb. mecralarda paylaşmayacağımı, açık rıza alınmamış ve tarafıma açıkça yetki verilmemiş hiçbir kişisel veri, bilgi ya da görseli işlemeyeceğimi ve kullanmayacağımı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Gönüllülüğün ifası için zorunlu kişisel verilerimin Ayika Derneği tarafından işlenmesine izin verdiğimi ve rızam bulunduğunu," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Ayika Derneği nezdindeki her türlü Kişisel Veriye ilişkin olarak, gönüllülük ilişkisi süresince ve gönüllülük ilişkisinin son bulmasını takiben de süresiz olarak Kişisel Verilerin Korunması Kanunu ve Kişisel Verilere ilişkin diğer mevzuata uygun davrandığımı ve davranacağımı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Kişisel verilere bağlı ihlalleri nedeniyle derneğin şahsıma rücu etme hakkının bulunduğunu ve iş bu Taahhütnameye aykırılıktan dolayı derneğin uğrayacağı her türlü zarardan sorumlu olacağımı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Ayika etkinlikleri kapsamında tarafımca kayda alınan ya da tarafıma ait fotoğraf, video, ses ve benzeri görsel ya da işitsel materyalin Ayika kurumsal iletişim organlarında (dergi, web sitesi, sosyal medya, vd.) ya da çeşitli iletişim-tanıtım materyalleri ile faaliyetlerinde Ayika Derneği tarafından süresiz olarak kullanımına izin verdiğimi ve bu konuda herhangi bir bedel talep etmediğimi," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Gönüllülük görevlerinin uygulanmasında karşılaşılan her türlü sorun ve sıkıntıda, öncelikle sorumlu dernek çalışanlarıyla iletişime geçerek çözüm bulmak amacıyla ortak hareket edeceğimi," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Dernek, dernek çalışanları, üyeleri, gönüllüleri, bağışçıları, sponsorları ve ihtiyaç sahipleri ile bursiyerleri hakkında elde edilen bilgileri hiçbir koşulda amaç dışında kullanmamayı, kopyalamamayı ve saklamamayı, üçüncü kişiler ve kamu ile paylaşmamayı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Gönüllü çalışmam sırasında eylemlerim nedeniyle maddi ya da manevi, doğrudan ya da dolaylı herhangi bir zarara uğrarsam veya dernek, dernek çalışanları, üyeleri, gönüllüler ya da 3. kişiler nezdinde herhangi bir maddi ya da manevi zarara sebep olursam, her türlü zarardan şahsi olarak sorumlu olduğumu," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Eylemlerim nedeniyle bir ihlal gerçekleşmesi akabinde dernek adına idari, adli para cezası vb. kesilmesi durumunda derneğin tarafıma rücu hakkı olduğunu ve bu masrafları şahsen karşılayacağımı," />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <ListItemText primary="Herhangi bir şekilde gönüllülüğün sona ermesi durumunda verilmiş ise kimlik kartı ve hizmette kullanılmak üzere verilen tüm malzemeleri iade etmeyi," />
            </ListItem>
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Kapat</Button>
      </DialogActions>
    </Dialog>
  );
} 